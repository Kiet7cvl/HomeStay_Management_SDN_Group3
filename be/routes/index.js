
const UserRouter = require('./user');
const Role = require('./role');
const Payment = require('./payment.route');
const AuthRouter = require('./auth');
const RoomRouter = require('./room');
const CategoryRouter = require('./category');
const ServiceRouter = require('./service');

// const express = require('express')
// const router = express.Router();
// router.use('/payments', require('./payment.route'));


module.exports = {
    UserRouter,
    Role,
    Payment,
    AuthRouter,
    RoomRouter,
    CategoryRouter,ServiceRouter
}


