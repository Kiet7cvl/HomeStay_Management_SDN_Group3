const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    email: {
      type: String,
      required: "email cannot be blank",
      match: [/.+\@.+\..+/, "email is not in the correct format"], // Kiểm tra định dạng email
      validate: {
        validator: function (checkEmail) {
          return /.+\@.+\..+/.test(checkEmail);
        },
        message: (props) => `${props.value} is not a valid email`, // Thông báo lỗi khi định dạng email không hợp lệ
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
  { collation: "conteacts" }
);

module.exports = mongoose.model("Contact", contactSchema);
