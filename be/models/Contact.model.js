const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      match: [/.+\@.+\..+/, "Email is not in the correct format"],
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contact", contactSchema);
