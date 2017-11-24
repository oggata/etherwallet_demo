var mongoose     = require('mongoose'); //mongoDBに接続するためのライブラリ
var Schema       = mongoose.Schema; //mongoDBのスキーマを作る

var UserSchema   = new Schema({
    name :String,
    screen_name: String,
    coin_amount: Number,
    email : String,
    password : String,
    secret: String,
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('UserModel', UserSchema);

