const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: "name cannot be blank",
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
    phone: {
      type: String,
    },
    password: {
      type: String,
      require: "password cannot be blank",
    },
    avatar: {
      type: String,
    },
    sex: {
      type: String,
      default: "Gioi tinh khac",
    },
    birthday: {
      type: Date,
    },

    status: { type: Number, default: 1 },
    type: {
      type: String,
      default: "USER",
    },
    created_at: { type: Date, default: Date.now },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
