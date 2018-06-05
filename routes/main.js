var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'chlwodms*1',
  database: 'swe',
  connectionLimit: 5,
});
/* GET home page. */
router.post('/',function(req,res,next){
    var username = req.body.username;
    var cmp = req.body.password;
    console.log(username);
    console.log(cmp);

    pool.getConnection(function(err, conn){
      var sql = "SELECT passwd FROM user_data where id=?";
      conn.query(sql,[username], function(err, result){
        if(err) console.error("find user err : "+err);
        if(result.length==0) res.send("not user");
        else if(cmp!=result[0].passwd)  // passwd 찾았고 다름
        {res.send("passwd error");}
        else
        {
          conn.query("SELECT * FROM game", function(err,game_rows){
            if(err) console.error("game list query error : " + err);
            conn.query("SELECT * FROM bucket",function(err,bucket_rows)
            {
              if(err) console.error("bucket query error : "+err);
              res.render('login_shop',{title: 'Shop', rows: game_rows, user:username, bucket:bucket_rows});
              conn.release();
            });
          });
        }
    });
  });
});

module.exports = router;
