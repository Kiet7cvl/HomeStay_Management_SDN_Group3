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