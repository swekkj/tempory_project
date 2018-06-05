var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'PASSWORD',
  database: 'swe',
  connectionLimit: 5,
});
/* GET home page. */
router.get('/', function(req, res, next){
    res.render('add');
});

router.post('/', function(req, res, next){
  var name = req.body.name;
  var price = req.body.price;
  var img = req.body.img;
  var property = req.body.property;
  var trailer = req.body.trailer;
  var date = req.body.date;
  var company = req.body.company;
  var publisher = req.body.publisher;
  var language = req.body.language;
  var condi = req.body.condi;
  var description = req.body.description;
  var evaluation = req.body.evaluation;
  var about = req.body.about;

  var data = [name, price, img, property, trailer, date, company, publisher, language, condi, description, evaluation, about];

  pool.getConnection(function(err, conn){
    if(err) console.error("join router error : "+ err);
    var q = "insert into game(name, price, img, property, trailer, date, company, publisher, language, condi, description, evaluation, about) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(q, data, function(err, rows){
      if(err) console.error("join router query error : " + err);
      res.redirect('/shop');
      conn.release();
    });
  });
});


module.exports = router;
