const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId , 
        ref : "User"
    },

    ProductId : {
        type  :mongoose.Types.ObjectId , 
        ref : "Product"
    },
    Owner : {
        type : mongoose.Types.ObjectId , 
        ref : "Admin"
    }, 
    paymentId : {
        type : String , 
        required : true
    }
}, {timestamps : true})


module.exports = mongoose.model("Order" , orderSchema)