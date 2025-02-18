const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    product : {
        type : mongoose.Types.ObjectId ,
        ref : "Product"
    } ,
    user : {
        type : mongoose.Types.ObjectId ,
        ref : "User"
    }
} , {timestamps : true})


module.exports = mongoose.model("Cart" , cartSchema);