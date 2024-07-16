const mongoose = require("mongoose");

const { ObjectId,Schema } = mongoose;

const imageSchema = new Schema(
    {
        imageID: ObjectId,
        url: {
            type: String,
            require: true,
        },
    }
);

module.exports = mongoose.model("Image", imageSchema);