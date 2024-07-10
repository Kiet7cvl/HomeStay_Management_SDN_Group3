

const UserRouter = require('./user');
const Role = require('./role');
const Auth = require('./auth');
const Payment = require('./payment.route');
const express = require('express');
const router = express.Router();

// router.use('/payments', require('./payment.route'));

module.exports = {
    UserRouter,
    Role,
    Auth,
    Payment
}
