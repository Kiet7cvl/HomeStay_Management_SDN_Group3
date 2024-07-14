const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
    },
    description: {
      type: String,
      required: [true, "description cannot be blank"],
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "roles" }
);

module.exports = mongoose.models.Role || mongoose.model("Role", roleSchema);
