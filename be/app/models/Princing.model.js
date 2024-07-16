const { mongo, default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const princingSchema = new Schema(
  {
    name: {
        type: String,
        required: "name cannot be blank",
      },
      description: {
        type: String,
        required: "DESCRIPTION cannot be blank",
      },
      price: {
        type: Number,
        required: "DESCRIPTION cannot be blank",
      },
      time: {
        type: Date,
        required: true,
      },
      owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      create_at: { type: Date, default: Date.now }
  },
  { collection: "princings" }
);

module.exports = mongoose.models.Princing || mongoose.model("Princing", princingSchema);