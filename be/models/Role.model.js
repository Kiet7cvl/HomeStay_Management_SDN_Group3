const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    description: {
      type: String,
      required: "description cannot be blank",
    },
    premission: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now },
  },
  { collation: "roles" }
);

const Role = mongoose.model("Role", roleSchema);