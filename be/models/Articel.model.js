const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
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
    create_at: { type: Date, default: Date.now },
  },
  { collection: "articles" }
);

module.exports =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
