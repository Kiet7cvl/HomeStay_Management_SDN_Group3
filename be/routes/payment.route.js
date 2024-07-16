const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const YOUR_DOMAIN = process.env.PORT;

router.get('/config', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID
    })
})

router.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 10000,
        description: 'Thanh toan hoa don',
        orderCode: 10,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
})

router.post('/receive-hook', async (req, res) => {
    console.log(req.body);
    res.json();
})

module.exports = router;
