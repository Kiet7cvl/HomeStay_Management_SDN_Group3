
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
    },
    created_at: { type: Date, default: Date.now },
  },

  { collection: "services " }
);

module.exports = mongoose.model("Service", ServiceSchema);