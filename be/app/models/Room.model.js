
const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      default: "EMPTY",
    },
    address: {
      type: String,
      required: "address cannot be blank",
    },
    price: {
      type: Number,
    },
    size: {
      type: Number,
    },
    bed: {
      type: Number,
    },
    bathroom: {
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
    category_id: { type: String, required: "category_id cannot be blank" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      }
    ],
    ablum: {
      type: Array,
    },
    create_at: { type: Date, default: Date.now },
  },
  { collection: "rooms" }
);

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);