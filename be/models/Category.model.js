const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
    },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "categories" }
);

module.exports = mongoose.model("Category", categorySchema);
