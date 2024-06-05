const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        email: {
            type: String,
        },
		phone: {
            type: String,
        },
        password: {
            type: String,
        },
        avatar: {
            type: String,
        },
        sex: {
            type: String,
            default: "Khac"
        },
        dob: {
            type: Date,
        },
        status: { type: Number, default: 1},
        type: {
            type: String,
            default: "USER"
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
    { timestamps: true},
    { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
