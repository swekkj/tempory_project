var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'swe',
  connectionLimit: 5,
});

/* GET home page. */
router.post('/',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    pool.getConnection(function(err,conn){
      if(err) console.error("poll connection error : " + err);
      conn.query("SELECT * FROM game", function(err,rows){
        if(err) console.error("query error : " + err);
        res.render('login_shop',{title: 'Shop', rows: rows,user:username});
        conn.release();
      });
    });
});
router.get('/', function(req, res, next) {
  pool.getConnection(function(err,conn){
    if(err) console.error("poll connection error : " + err);
    conn.query("SELECT * FROM game", function(err,rows){
      if(err) console.error("query error : " + err);
      res.render('shop',{title: 'Shop', rows: rows});
      conn.release();
    });
  });
});

router.get('/detail/:idx',function(req,res,next){
  pool.getConnection(function(err,conn){
    if(err) console.error("poll connection error : " + err);
    var idx = req.params.idx;
    var sql = "select * from game where idx=?";
    conn.query(sql,[idx],function(err, rows){
      res.render('detail',{rows:rows});
    });
  });
});


module.exports = router;
