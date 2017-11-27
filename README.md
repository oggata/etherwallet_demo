# etherwallet_demo

#npmをinstallする(ubuntu)
sudo apt-get install build-essential
sudo apt-get remove --purge nodejs
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install npm@latest -g

#mongodb
sudo apt-get install ntp
sudo apt-get install mongodb
mongo -version
sudo ufw status
sudo ufw allow 3000 <-Mongodbで使う
sudo ufw allow 27017 <-Mongodbで使う
sudo ufw allow 27018 <-Mongodbのwebconsoleで使う
sudo ufw allow 28017 <-Mongodbのwebconsoleで使う
//許可ポート以外閉じる
sudo ufw default deny
$ sudo service mongodb start
or
$ sudo service mongodb restart


#使い方
cd /var/www/html
git clone git@github.com:oggata/etherwallet_demo.git
cd etherwallet_demo
sudo npm install

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
curl 'http://localhost:3000/api/v1/user/findbysecret' --data 'secret=abc' -XGET
curl 'http://localhost:3000/api/v1/user/create' --data 'name=aaaa&screen_name=aaaaa&email=test@gmail.com&password=test&secret=abcd' -XPOST

findAll
curl -X GET http://localhost:3000/api/v1/user/

findById
curl -X GET -F "id=5a13b1528e790a851172b817" http://localhost:3000/api/v1/user/
