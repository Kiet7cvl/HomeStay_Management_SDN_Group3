const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    email: {
      type: String,
      validate: {
        validator: function (checkEmail) {
          return /.+\@.+\..+/.test(checkEmail);
        },
        message: (props) => `${props.value} is not a valid email`, // Thông báo lỗi khi định dạng email không hợp lệ
      },
      required: [true, "User email required"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (phoneNumber) {
          return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(
            phoneNumber
          );
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
      required: [true, "User phone number required"],
    },
    password: {
      type: String,
      required: "password cannot be blank",
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
    purchase_count: {
      type: Number,
      default: 0
    },
    experience_points: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0
    },
  },
  { collection: "user" }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
