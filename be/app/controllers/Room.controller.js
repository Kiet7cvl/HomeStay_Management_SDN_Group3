const Room = require('../models/Room.model'); // Adjust the path as needed
const { buildResponsePaging, buildParamPaging } = require("../../helper/BuildData.helper");
// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      avatar: req.body.avatar,
      room_code: req.body.room_code,
      status: req.body.status,
      floor: req.body.floor,
      price: req.body.price,
      size: req.body.size,
      bed: req.body.bed,
      total_vote: req.body.total_vote,
      total_star: req.body.total_star,
      description: req.body.description,
      room_content: req.body.room_content,
      category_id: req.body.category_id,
      category: req.body.category,
      ablum: Array.isArray(req.body.ablum) ? album : [album]
    });
    await room.save().then((room) => {
      res.status(201).json({ data: room, status: 201 });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  // try {
  //   const rooms = await Room.find().populate('category');
  //   res.status(200).json(rooms);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  try {
    // execute query with page and limit values
    const condition = {};
    if (req.query.size) condition.size = req.query.size;
    if (req.query.bed) condition.bed = req.query.bed;
    if (req.query.name) condition.name = { $regex: '.*' + req.query.name + '.*' };
    if (req.query.price) condition.price = req.query.price;
    if (req.query.floors) condition.floors = req.query.floors;
    if (req.query.category_id) condition.category_id = req.query.category_id;
    // if(req.query.size) condition.size = req.query.size;
    const paging = buildParamPaging(req.query);
    const rooms = await Room.find()
      .where(condition)
      .limit(paging.page_size)
      .skip((paging.page - 1) * paging.page_size)
      .exec();

    // get total documents in the Posts collection
    const count = await Room.count().where(condition);

    // return response with posts, total pages, and current page
    const meta = buildResponsePaging(paging.page, paging.page_size, count)
    const status = 200;
    const data = {
      rooms: rooms
    }
    res.json({
      data,
      meta,
      status
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('category').populate('services');
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ data: room, status: 200 });

    // const room = await Room.findOne( { _id: req.params.id } )

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get room by Owner ID
exports.getRoomByOwner = async (req, res) => {
  try {
    const room = await Room.find({ owner: req.params.id });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ data: room, status: 200 });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        avatar: req.body.avatar,
        room_code: req.body.room_code,
        status: req.body.status,
        floor: req.body.floor,
        price: req.body.price,
        size: req.body.size,
        bed: req.body.bed,
        total_vote: req.body.total_vote,
        total_star: req.body.total_star,
        description: req.body.description,
        room_content: req.body.room_content,
        category_id: req.body.category_id,
        category: req.body.category,
        ablum: Array.isArray(req.body.ablum) ? album : [album]
        ,
      },
    });
    if (!room) {
      return res.status(404).send({ error: "Room doesn't exist!" });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
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
