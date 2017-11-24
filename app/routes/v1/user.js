var express = require('express');
var router = express.Router();

var UserModel = require('../../models/userModel.js');

//table_name: usermodels
/*
router.get('/', function (req, res) {
    console.log("findall");
    UserModel
        .find()
        .then(function (users) {
            res.json(users);
        });
});
*/

router.get('/:id', function (req, res) {
    var Userid = req.params.id;
    UserModel
        .findById(Userid,function (err,user) {
            res.json(user);
        });
});

router.post('/create',function(req,res){
    UserModel
        .find({secret:req.body.secret})
        .then(function (user) {
            console.log(req.body.secret);
            console.log(user.length);
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
                User.secret = req.body.secret;
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

router.post('/findbysecret',function(req,res){
    var User = null;
    UserModel
        .find({secret:req.body.secret})
        .then(function (user) {
            console.log(req.body.secret);
            if(user.length == 0){
                res.json({ message: 'user not found' });
            }
            if (err){
                res.send(err);
            }else{
                res.json(users);
            }
        }
    );
});

router.post('/paybysecret',function(req,res){
    var User = null;
    var _secret = req.body.secret;
    var _amount = req.body.amount;
    UserModel
        .find({secret:req.body.secret})
        .then(function (user) {
            console.log(req.body.secret);
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


router.put('/:id',function (req, res) {

    var Userid = req.params.id;

    UserModel
        .findById(Userid, function(err, user) {
            if (err) {
                res.send(err);
            } else {

                user.name = req.body.name;
                user.screen_name = req.body.screen_name;
                user.bio = req.body.bio;

                user.save(function(err) {
                    if (err){
                        res.send(err);
                    } else {
                        res.json({ message: 'Success!' });
                    }
                });
            }
        });
});


// GET  http://localhost:3000/api/v1/user/test
//router.get('/test', function (req, res) {
//    res.json({
//        message:"This is user api"
//    });
//});

//routerをモジュールとして扱う準備
module.exports = router;


