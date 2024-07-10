const express = require('express');
const router = express.Router();

router.use('/payments', require('./payment.route'));

module.exports = router;
