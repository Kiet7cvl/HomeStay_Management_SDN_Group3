const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
// const { createMoMoPayment } = require('../app/controllers/momoPayment');

// router.post('/momo', createMoMoPayment);
router.get('/config', (req, res) =>{
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID
    })
})

module.exports = router;
