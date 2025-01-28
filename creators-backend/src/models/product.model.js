const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name : {
        type  :String ,
        required  : true,
    },
    owner  :{
        type : mongoose.Types.ObjectId,
        ref : "Admin"
    },
    category : {
        type : String , 
        required : true 
    },
    description :{
        type : String
    },
    price : {
        type  :Number , 
        required : true
    },
    thumbnail : {
        type  :String ,
        required  :true
    },
    images  :[{
        type : String , 
        required  :true
    }],
    file : {
        type : String
    }
})

module.exports = mongoose.model("Product" , productSchema);