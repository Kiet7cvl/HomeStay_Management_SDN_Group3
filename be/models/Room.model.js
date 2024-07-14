const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      default: "EMPTY",
    },
    floor: {
      type: Number,
    },
    price: {
      type: Number,
    },
    bed: {
      type: Number,
    },
    total_vote: {
      type: Number,
    },
    total_star: {
      type: Number,
    },
    description: {
      type: String,
    },
    room_content: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category_id cannot be blank"]
    },
    album: {
      type: Array,
    },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "rooms" }
);

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
