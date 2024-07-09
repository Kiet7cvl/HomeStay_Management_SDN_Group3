// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/common/payment.controller');

router.get('/vnpay_return', paymentController.handlePaymentReturn);

module.exports = router;

// controllers/paymentController.js
exports.handlePaymentReturn = (req, res) => {
    const query = req.query;
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;

    const check = vnpay.verifyReturnUrl(query, secureHash);
    if (check) {
        res.send('Payment successful');
    } else {
        res.send('Payment failed');
    }
};
