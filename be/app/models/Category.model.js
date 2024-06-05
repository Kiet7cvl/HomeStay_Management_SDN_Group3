const mongoose = require('mongoose');

const { Schema } = mongoose;

const modelSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        }
    },
    { timestamps: true },
    { collection: 'categories' }
);

module.exports = mongoose.model('Category', modelSchema);
