const express = require('express');
const router = express.Router();
const { createMoMoPayment } = require('../app/controllers/momoPayment');

router.post('/momo', createMoMoPayment);

module.exports = router;
