const express = require('express');
const router = express.Router();
const roomController = require('../app/controllers/Room.controller'); // Adjust the path as needed
const authMiddleware = require('../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;

// CRUD routes for Room
router.post('/create', isAuth, roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.put('/:id', isAuth, roomController.updateRoom);
router.delete('/:id', isAuth, roomController.deleteRoom);

module.exports = router;
