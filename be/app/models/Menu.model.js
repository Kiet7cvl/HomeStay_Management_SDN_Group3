const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    create_at: { type: Date, default: Date.now },
  },
  { collation: "menu" }
);

module.exports = mongoose.model("Menu", menuSchema);
