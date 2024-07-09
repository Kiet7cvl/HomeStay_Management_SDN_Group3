const { VNPay } = require('vnpay');

const vnpay = new VNPay({
    tmnCode: 'YOUR_TMN_CODE',
    secureSecret: 'YOUR_HASH_SECRET',
    vnpayHost: 'https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder',
    testMode: true,
    hashAlgorithm: 'SHA512',
    enableLog: true
});

module.exports = vnpay;