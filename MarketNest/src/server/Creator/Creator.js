// models/Creator.js
const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    profilephoto: String,
    joindate: { type: Date, default: Date.now },
    city: String,
    country: String,
    wallletbalance: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    about: String,
    categories: [String],
    products: [String],
    paymentdetails: {
        accountnumber: String,
        accountname: String,
        ifsccode: String
    }
});

module.exports = mongoose.model('Creator', CreatorSchema);