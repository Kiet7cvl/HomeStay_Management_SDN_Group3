const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be blank"],
    },
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
    article_content: {
      type: String,
    },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "articles" }
);

module.exports = mongoose.models.Article || mongoose.model("Article", articleSchema);
