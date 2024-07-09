const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name cannot be blank",
    },
    email: {
      type: String,
      required: "Email cannot be blank",
      match: [/.+\@.+\..+/, "Email is not in the correct format"],
      validate: {
        validator: function (checkEmail) {
          return /.+\@.+\..+/.test(checkEmail);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    create_at: { type: Date, default: Date.now },
  },
  { collection: "conteacts" }
);

module.exports = mongoose.model("Contact", contactSchema);