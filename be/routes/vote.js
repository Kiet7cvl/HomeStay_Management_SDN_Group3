var express = require('express');
var router = express.Router();

const controllerBuilder = require('../app/controllers/Vote.controller');


router.route('/vote/').get(controllerBuilder.index);
router.route('/vote/:id').get(controllerBuilder.getCommentByRoomId);
router.route('/vote/store').post(controllerBuilder.store);

module.exports = router;
