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

router.get('/finish',function(req,res,next){
  pool.getConnection(function(err, conn){
    if(err) console.error("pool connect error : " + err);
    var sql = "DELETE FROM bucket";
    conn.query(sql,function(err, result){
      if(err) console.error('query connect error : ' + err);
      res.redirect('/main');
      conn.release();
    });
  });
})
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, conn){
    if(err) console.error("pool connect error : " + err);
    var sql = "SELECT * FROM bucket";
    conn.query(sql,function(err, result){
      if(err) console.error('query connect error : ' + err);
      res.render('order', { title: '구매', bucketList: result });
      conn.release();
    });
  });
});


module.exports = router;
