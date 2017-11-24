# etherwallet_demo

#使い方
git clone --
cd etherwallet_demo
npm install

#JavaScript書き出し(npmをwebclientから使えるようにするため)
browserify wallet.js -o wallet_render.js

#WEBサーバー起動
python -m SimpleHTTPServer

#APIサーバー起動
node app/app.js

#npmインストール(手順覚書。package.jsonで管理されているので通常はnpm install一発)
npm init
npm install --save-dev bip39
npm install --save-dev ethereumjs-wallet
npm install --save-dev web3
npm install --save-dev ethereumjs-tx
npm install --save-dev browserify
npm install --save-dev mongodb
npm install --save-dev express
npm install --save-dev mongodb
npm install --save-dev mongoose
npm install --save-dev body-parser
npm install --save-dev moment
npm install --save-dev crypto-js

#APIサンプルpost
curl 'http://localhost:3000/api/v1/user/' --data 'name=aaaa&screen_name=aaaaa&coin_amount=100&email=test@gmail.com&password=test&secret=abc' -XPOST


curl 'http://localhost:3000/api/v1/user/paybysecret' --data 'secret=abc&amount=10' -XPOST

curl 'http://localhost:3000/api/v1/user/create' --data 'name=aaaa&screen_name=aaaaa&email=test@gmail.com&password=test&secret=abcd' -XPOST

findAll
curl -X GET http://localhost:3000/api/v1/user/

findById
curl -X GET -F "id=5a13b1528e790a851172b817" http://localhost:3000/api/v1/user/
