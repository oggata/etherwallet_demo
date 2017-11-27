var express = require('express');
// ルーティングするで
var router = express.Router();

//router.use('/article', require('./article.js'));
router.use('/user', require('./user.js'));

/*
// routerにルーティングの動作を書いてく
router.get('/',function(req,res){
    res.json({
        message:"Hello,world111"
    });
});

*/


//routerをモジュールとして扱う準備
module.exports = router;

