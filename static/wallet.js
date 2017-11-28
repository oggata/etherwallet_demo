(function () {
    function foo() {
        console.log("foo");
        return 'foo!';
    }
    window.foo = foo;

    function loadStorage() {
        ret = confirm("既存のウォレットを削除してウォレットデータを読み込みますか？");
        if (ret == true) {
            window.localStorage.setItem("WALLET_KEY", document.getElementById('wallet_mnemonic').value);
            location.reload();
        }
    }
    window.loadStorage = loadStorage;

    function clearStorage() {
        ret = confirm("ウォレットデータを削除して新しく作り直しますか？");
        if (ret == true) {
            window.localStorage.removeItem("WALLET_KEY");
            location.reload();
        }
    }
    window.clearStorage = clearStorage;

    function buy001() {
        ret = confirm("購入しますか？");
        if (ret == true) {
            try2send();
            alert("購入しました。ウォレットに反映されるまで最大10分かかります.");
            //location.reload();
        }
    }
    window.buy001 = buy001;

    function buy002() {
        ret = confirm("購入しますか？");
        if (ret == true) {
            try2send();
            alert("購入しました。ウォレットに反映されるまで最大10分かかります.");
            //location.reload();
        }
    }
    window.buy002 = buy002;

    function buy003() {
        ret = confirm("購入しますか？");
        if (ret == true) {
            try2send();
            alert("購入しました。ウォレットに反映されるまで最大10分かかります.");
            //location.reload();
        }
    }
    window.buy003 = buy003;

    function sendTransaction() {
        try2send();
    }
    window.sendTransaction = sendTransaction;
})();

function exectest() {
    ret = confirm("hogeへ移動します。");
    if (ret == true) {
        location.href = "http://hoge.jp/";
    }
}

// localStorageが使用出来るかチェック
if (!window.localStorage) {
    alert("お使いのブラウザはlocalstorageに対応してません。");
}
// localStorageに値を保存
function setItem(key, val) {
    window.localStorage.setItem(key, val);
}
// localStorageから値を取得
function getItem(key) {
    return window.localStorage.getItem(key);
}
// localStorageに保存されている、あるkeyの値を削除する
function removeItem(key) {
    console.log("removed key");
    window.localStorage.removeItem(key);
}
// localStorageに保存されているすべての値を削除する
function clear() {
    console.log("clear key");
    window.localStorage.clear();
}

function alerttest() {
    alert("hotehote");
}

function generatewallet() {
    var bip39 = require('bip39')
    var mnemonic = bip39.generateMnemonic()
    const hdkey = require('ethereumjs-wallet/hdkey')
    privateKey = hdkey.fromMasterSeed(mnemonic)._hdkey._privateKey
    const Wallet = require('ethereumjs-wallet')
    const wallet = Wallet.fromPrivateKey(privateKey)
    //wallet data
    var _wd = new Object();
    _wd.address = wallet.getChecksumAddressString();
    _wd.privatekey = wallet.getPrivateKeyString();
    _wd.mnemonic = mnemonic;
    return _wd;
}

function importwallet(mnemonic) {
    const hdkey = require('ethereumjs-wallet/hdkey')
    privateKey = hdkey.fromMasterSeed(mnemonic)._hdkey._privateKey
    const Wallet = require('ethereumjs-wallet')
    const wallet = Wallet.fromPrivateKey(privateKey);
    //wallet data
    var _wd = new Object();
    _wd.address = wallet.getChecksumAddressString();
    _wd.privatekey = wallet.getPrivateKeyString();
    _wd.mnemonic = mnemonic;
    return _wd;
}

function loadBalance(wallet_address) {
    var Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
    //送金元のwallet残高
    web3.eth.getBalance(wallet_address, function (error, result) {
        if (!error) {
            var balance = web3.utils.fromWei(result, "ether")
            console.log("A balance:" + balance + "ether");
            var _balanceLabel = document.getElementById('wallet_balance');
            _balanceLabel.innerHTML = balance.toString();
            return balance;
        } else {
            console.error(error);
            return 0;
        }
    });
}

function sendSigned(txData, cb) {
    var Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
    const EthereumTx = require('ethereumjs-tx')
    const tx = new EthereumTx(txData)
    //先頭の0xを省く
    var _pk = document.getElementById('wallet_privatekey').value.slice(2);
    var privateKey = new Buffer(_pk, 'hex');
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), cb)
}

function try2send() {
    var Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
    //ethereum回収用のアドレスを設定する
    var toAddress = '0x418d0ABF2Bdfa98A8873fFA3CcD538AE76b9E21e';
    var fromAddress = document.getElementById('wallet_address').value;
    var EthereumTx = require('ethereumjs-tx');
    //transaction
    web3.eth.getTransactionCount(fromAddress).then(txCount => {
        console.log("nonce:" + txCount);
        const txData = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(web3.utils.toWei('0.00000009', 'ether')),
            gasLimit: web3.utils.toHex(30000),
            to: toAddress,
            value: web3.utils.numberToHex(web3.utils.toWei('0.0001', 'ether')),
            data: web3.utils.asciiToHex('hello'),
            //chainId: 1
        }
        console.log("send----->");
        sendSigned(txData, function (err, result) {
            if (err) return 
            alert("error:" + err + "");
            console.log('error', err)
            console.log('sent', result)
            alert("" + result + "");
        })
    })
}

window.onload = function () {
    //wallet-keyがlocalstorageに存在するかチェック
    if (!getItem("WALLET_KEY")) {
        console.log("create wallet key");
        var _wd = generatewallet();
        localStorage.setItem("WALLET_KEY", _wd.mnemonic);
        document.getElementById('wallet_mnemonic').value = _wd.mnemonic;
        document.getElementById('wallet_address').value = _wd.address;
        document.getElementById('wallet_privatekey').value = _wd.privatekey;
        alert("walletが作成されました。下記のキーを忘れた場合、資産を取り出すことができなくなります. key:" + _wd.mnemonic);
    } else {
        console.log("load wallet key");
        var _wd = importwallet(getItem("WALLET_KEY"));
        document.getElementById('wallet_mnemonic').value = _wd.mnemonic;
        document.getElementById('wallet_address').value = _wd.address;
        document.getElementById('wallet_privatekey').value = _wd.privatekey;
        var _balance = loadBalance(_wd.address);
    }
};