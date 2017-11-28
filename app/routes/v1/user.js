var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var UserModel = require('../../models/userModel.js');

//curl 'http://localhost:3000/api/v1/user/test' --data 'secret=abc' -XGET
router.get('/test', function (req, res) {
    res.json({
        message:"This is user api"
    });
});

router.get('/findbysecret',function(req,res){
    var _secret = decrypt(req.body.secret);
    var User = null;
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            console.log(req.body.secret);
            if(user.length == 0){
                res.json({ message: 'user not found' });
            }
            res.json(user);
        }
    );
});

router.post('/create',function(req,res){
    UserModel
        .find({secret:req.body.secret})
        .then(function (user) {
            //console.log(req.body.secret);
            //console.log(user.length);
            var _secret = decrypt(req.body.secret);
            if(user.length > 0){
                res.json({ message: 'already user exists error' });
            }else{
                var User = new UserModel();
                // データを詰め込む
                User.name = req.body.name;
                User.screen_name = req.body.screen_name;
                User.coin_amount = 0;
                User.email = req.body.email;
                User.password = req.body.password;
                User.secret = _secret;
                // 保存処理
                User.save(function(err) {
                    if (err){
                        // エラーがあった場合エラーメッセージを返す
                        res.send(err);
                    } else {
                        // エラーがなければ「Success!!」
                        res.json({ message: 'Success!!' });
                    }
                });
            }
        }
    );
});

router.post('/paybysecret',function(req,res){
    var User = null;
    //var _secret = req.body.secret;
    var _secret = decrypt(req.body.secret);
    var _amount = req.body.amount;
    UserModel
        .find({secret:_secret})
        .then(function (user) {
            console.log(_secret);
            console.log(user[0]);
            if(user.length == 0){
                res.json({ message: 'user not found' });
            }
            User = user[0]
            if(_amount > 0){
                if(User.coin_amount <= _amount){
                    res.json({ message: 'lack of balance' });
                }
            }
            User.coin_amount = Number(User.coin_amount) + Number(_amount);
            User.save(function(err) {
                if (err){
                    res.send(err);
                } else {
                    res.json({ message: 'Success!', user_coin_amount:User.coin_amount});
                }
            });
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

//routerをモジュールとして扱う準備
module.exports = router;


