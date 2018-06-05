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
var username;
var user_prop;
/* GET home page. */
router.post('/',function(req,res,next){
    username = req.body.username;
    var cmp = req.body.password;
    console.log(username);
    console.log(cmp);

    pool.getConnection(function(err, conn){
      var sql = "SELECT * FROM user_data where id=?";
      conn.query(sql,[username], function(err, result){
        if(err) console.error("find user err : "+err);
        if(result.length==0) res.redirect("/shop");
        else if(cmp!=result[0].passwd)  // passwd 찾았고 다름
        {res.redirect("/shop");}
        else
        {
          user_prop = result[0].property;
          conn.query("SELECT * FROM game", function(err,game_rows){
            if(err) console.error("game list query error : " + err);
            conn.query("SELECT * FROM bucket",function(err,bucket_rows)
            {
              if(err) console.error("bucket query error : "+err);
              res.render('login_shop',{title: 'Shop', rows: game_rows, user:username, bucket:bucket_rows, prop:user_prop});
              conn.release();
            });
          });
        }
    });
  });
});
router.get('/', function(req,res,next){
    pool.getConnection(function(err, conn){
        if(err) console.error("pool error : " + err);
            conn.query("SELECT * FROM game", function(err,game_rows){
              if(err) console.error("game list query error : " + err);
              conn.query("SELECT * FROM bucket",function(err,bucket_rows)
              {
                if(err) console.error("bucket query error : "+err);
                res.render('login_shop',{title: 'Shop', rows: game_rows, user:username, bucket:bucket_rows, prop:user_prop});
                conn.release();
              });
            });
      });
});

router.get('/:idx',function(req,res,next){
    var idx = req.params.idx;
    pool.getConnection(function(err,conn){
        if(err) console.error("poll connection error : " + err);
        conn.query("select * from bucket where idx=?",[idx],function(err,rows){
            if(err) console.error("search error" + err);
                console.log(rows);
                if(rows.length == 0)
                {
                    var sql = "INSERT INTO bucket(name, image, price, idx) SELECT name, img, price, idx FROM game WHERE idx=?";
                    conn.query(sql,[idx],(err,rows) => {
                    if(err)console.error("insert error : " + err);
                        conn.query("SELECT * from game",(err,gameRows)=>{
                            if(err)console.error("find game table error : " + err);
                            conn.query("SELECT * from bucket",(err,bucketRows)=>{
                                if(err)console.error("find bucket table error : " + err);
                                res.render('login_shop',{title:"login",user:username,rows:gameRows,bucket:bucketRows, prop:user_prop});
                            });
                        });
                    });
                }
        });
    });
});
module.exports = router;
