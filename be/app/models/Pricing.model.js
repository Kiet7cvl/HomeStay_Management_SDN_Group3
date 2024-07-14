const mongoose = require("mongoose");
const { Schema } = mongoose;

const pricingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
    },
    description: {
      type: String,
      required: [true, "description cannot be blank"],
    },
    price: {
      type: Number,
      required: [true, "price cannot be blank"],
    },
    time: {
      type: Date,
      required: true,
    },
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now }
  },
  { collection: "pricings" }
);

module.exports = mongoose.models.Pricing || mongoose.model("Pricing", pricingSchema);
