var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order', { title: 'Express',test:"order" });
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
