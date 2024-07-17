const express = require('express');
const router = express.Router();
const roomController = require('../app/controllers/Room.controller'); // Adjust the path as needed
const authMiddleware = require('../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;
const { upload } = require("../app/services/upload");

// CRUD routes for Room
router.post('/room/create', isAuth, upload.single("avatar") ,roomController.createRoom);
router.get('/room/', roomController.getAllRooms);
router.get('/room/:id', roomController.getRoomById);
router.get('/owner/room-list/:id', roomController.getRoomByOwner);
router.get('/owner/room-detail/:id', roomController.getRoomById);
router.put('/room/:id', isAuth, roomController.updateRoom);
router.delete('/room/:id', isAuth, roomController.deleteRoom);

module.exports = router;
