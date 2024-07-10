const express = require('express');
const router = express.Router();
const { createMoMoPayment } = require('../controller/common/momoPayment');

router.post('/momo', createMoMoPayment);

module.exports = router;
