


const UserRouter = require('./user');
const Role = require('./role');
const Payment = require('./payment.route');
const express = require('express');
const router = express.Router();

// router.use('/payments', require('./payment.route'));
;
const AuthRouter = require('./auth');
const RoomRouter = require('./room');


module.exports = {
    UserRouter,
    Role,
    Payment,
    AuthRouter,
    RoomRouter
}

