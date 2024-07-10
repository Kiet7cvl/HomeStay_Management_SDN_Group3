const express = require('express');
const router = express.Router();
const roomController = require('../controller/common/Room.controller');

router.get('/room/', roomController.getAllRooms);
router.get('/room/:id', roomController.getRoomById);
router.post('/room/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);

module.exports = router;