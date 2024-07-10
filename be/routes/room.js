const express = require('express');
const router = express.Router();
const roomController = require('../app/controllers/Room.controller'); // Adjust the path as needed

// CRUD routes for Room
router.post('/create', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
