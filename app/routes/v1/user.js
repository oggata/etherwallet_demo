var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var UserModel = require('../../models/userModel.js');

//curl 'http://localhost:3000/api/v1/user/test' --data 'secret=abc' -XGET
router.get('/test', function (req, res) {
    res.json({
        status:"ok",
        message:"This is user api"
    });
});

router.get('/finduser',function(req,res){
    console.log("finduser");
    var _secret = encrypt(req.body.secret);
    var User = null;
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            if(user.length == 0){
                res.json({ 
                    status:"ok",
                    message: 'user not found' 
                });
            }
            res.json(user);
        }
    );
});

router.post('/create',function(req,res){
    console.log("create");
    var _secret = encrypt(req.body.secret);
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            if(user.length > 0){
                res.json({ 
                    status:"error",
                    message: 'already user exists error' 
                });
            }else{
                var User = new UserModel();
                // データを詰め込む
                User.name = req.body.name;
                User.screen_name = req.body.screen_name;
                User.coin_amount = 0;
                User.email = req.body.email;
                User.password = req.body.password;
                User.secret = _secret;
                User.score = 0;
                // 保存処理
                User.save(function(err) {
                    if (err){
                        // エラーがあった場合エラーメッセージを返す
                        res.send(err);
                    } else {
                        // エラーがなければ「Success!!」
                        res.json({ 
                            status:"ok",
                            message: 'Success!!' 
                        });
                    }
                });
            }
        }
    );
});

router.post('/pay',function(req,res){
    console.log("pay");
    var User = null;
    var _secret = encrypt(req.body.secret);
    var _amount = req.body.amount;
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            if(user.length == 0){
                res.json({ 
                    status:"error",
                    message: 'user not found' 
                });
            }
            User = user[0]
            if(_amount > 0){
                if(User.coin_amount <= _amount){
                    res.json({ 
                        status:"error",
                        message: 'lack of balance' 
                    });
                }
            }
            User.coin_amount = Number(User.coin_amount) + Number(_amount);
            User.save(function(err) {
                if (err){
                    res.send(err);
                } else {
                    res.json({ 
                        status:"ok",
                        message: 'Success!', 
                        user_coin_amount:User.coin_amount
                    });
                }
            });
        }
    );
});

router.post('/sendscore',function(req,res){
    var User = null;
    var _secret = encrypt(req.body.secret);
    var _score = req.body.score;
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            if(user.length == 0){
                res.json({ 
                    status:"error",
                    message: 'user not found' 
                });
            }
            User = user[0]
            if(User.score < _score){
                User.score = Number(_score)
                User.save(function(err) {
                    if (err){
                        res.send(err);
                    } else {
                        res.json({ 
                            status:"ok",
                            message: 'Success! new record'
                        });
                    }
                });

            }else{
                res.json({ 
                    status:"ok",
                    message: 'records do not update' 
                });
            }
        }
    );
});

//暗号化
function encrypt(planeText) {
    var passowrd = 'passw0rd';
    var cipher = crypto.createCipher('aes192', passowrd);
    cipher.update(planeText, 'utf8', 'hex');
    var cipheredText = cipher.final('hex');
    //console.log('暗号化(AES192) :');
    //console.log(cipheredText);
    return cipheredText;
}

/*
//復号化
function decrypt(cipheredText) {
    var passowrd = 'passw0rd';
    var decipher = crypto.createDecipher('aes192', passowrd);
    decipher.update(cipheredText, 'hex', 'utf8');
    var dec = decipher.final('utf8');
    //console.log('復号化(AES192) : ');
    //console.log(dec);
    return dec;
}
*/

//routerをモジュールとして扱う準備
module.exports = router;


