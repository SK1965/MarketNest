const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    mrp: Number,
    discount: Number,
    thumbnail: String,
    images: [String],
    creator: String,
    format: String,
    responsive: String,
    customization: String,
    sold : {type :Number ,default : 0},
    file : "String"
});

module.exports = mongoose.model('Product', ProductSchema);