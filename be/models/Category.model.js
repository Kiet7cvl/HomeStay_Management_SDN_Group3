const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    created_at: { type: Date, default: Date.now },
  },
  { collation: "categories " }
);

module.exports = mongoose.model("Category", categorySchema);
