const Room = require('../models/Room.model'); // Adjust the path as needed

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('category');
    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('category');
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a room by ID
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
