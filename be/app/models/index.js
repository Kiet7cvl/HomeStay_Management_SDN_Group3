
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const User = require('./User.model');
const Role = require('./Role.model');
const Article = require('./Article.model');
const Booking = require('./Booking.model');
const Contact = require('./Contact.model');
const Room = require('./Room.model');
const Vote = require('./Vote.model');
const Category = require('./Category.model');
const Princing = require('./Princing.model');
const Service = require('./Service.model');

const db = {};

db.mongoose = mongoose;
db.user = User;
db.role = Role;
db.article = Article;
db.booking = Booking;
db.contact = Contact;
db.room = Room;
db.vote = Vote;
db.category = Category;
db.princing = Princing;
db.service = Service;

db.ROLES = ["ADMIN", "OWNER", "USER"];

db.connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(() => console.log("Connect to MonggoDB success"))
    .catch(error => console.log(error.message));
};

module.exports = db;
