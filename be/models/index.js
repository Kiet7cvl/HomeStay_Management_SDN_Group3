const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require('./User.model');
const Role = require('./Role.model');
const Article = require('./Articel.model');
const Booking = require('./Booking.model');
const Contact = require('./Contact.model');
const Room = require('./Room.model');
const Vote = require('./Vote.model');
const Category = require("./Category.model");
const Pricing = require('./Pricing.model');

const db = {};

db.user = User;
db.role = Role;
db.article = Article;
db.booking = Booking;
db.contact = Contact;
db.category = Category;
db.room = Room;
db.vote = Vote;
db.princing = Pricing;

db.ROLES = ["ADMIN", "OWNER", "USER"];

db.connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
        .then(() => console.log("Connect to MongoDB success"))
        .catch(error => console.error(error.message));
}

module.exports = db;
