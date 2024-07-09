// controllers/paymentController.js
const vnpay = require('../../config/Vnpay');

exports.createPayment = (req, res) => {
    const orderId = '1234'; // Your order ID
    const amount = 100000; // Amount in VND
    const ipAddr = req.ip;

    const paymentUrl = vnpay.buildPaymentUrl({
        amount,
        returnUrl: 'http://yourdomain.com/vnpay_return',
        orderInfo: 'Payment for order #' + orderId,
        ipAddr,
        orderId
    });

    res.redirect(paymentUrl);
};
