const { get } = require("http");
const Room = require("../../model/Room.model");

const createRoom = async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image,
    });
    await room.save().then((room) => {
      res.status(201).json({ data: room, status: 201 });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getRooms = async (req, res) => {
  try {
    var rooms = await Room.find();
    res.status(200).json({ data: rooms, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ error: "Room doesn't exist!" });
    }
    res.status(200).json({ data: room, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
      },
      { new: true }
    );
    if (!room) {
      return res.status(404).send({ error: "Room doesn't exist!" });
    }
    res.status(200).json({ data: room, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
};
