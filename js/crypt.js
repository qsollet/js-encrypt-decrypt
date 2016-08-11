var encrypt = function(message, secret) {
    var salt = CryptoJS.lib.WordArray.random(128/8);
    var iv = CryptoJS.lib.WordArray.random(128/8);

    var key = CryptoJS.PBKDF2(
        secret,
        salt,
        {keySize: 256/32, iterations: 1000 }
    );

    encrypted = CryptoJS.AES.encrypt(
        message,
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return {
        "message":encrypted.ciphertext.toString(CryptoJS.enc.Hex),
        "salt":salt.toString(CryptoJS.enc.Hex),
        "iv":iv.toString(CryptoJS.enc.Hex)
    };
}

var decrypt = function(crypted, secret) {
    var key = CryptoJS.PBKDF2(
        secret,
        CryptoJS.enc.Hex.parse(crypted.salt),
        {keySize: 256/32, iterations: 1000}
    );

    var iv = CryptoJS.enc.Hex.parse(crypted.iv);

    var cipherStuff = CryptoJS.lib.CipherParams.create({
        key : key,
        iv : iv,
        ciphertext : CryptoJS.enc.Hex.parse(crypted.message)
    });

    return decrypted = CryptoJS.AES.decrypt(
        cipherStuff,
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    )
    .toString(CryptoJS.enc.Utf8);
}
