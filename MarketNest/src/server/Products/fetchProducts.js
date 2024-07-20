const Product = require("./Product")


const fetchProduct = (search)=>{
    const query ={
        $or :[
            {description  : {$regex:search , $options  : "i"}},
            {name: {$regex:search , $options  : "i"}},
            {type : {$regex:search , $options  : "i"}},
            {creative  : {$regex:search , $options  : "i"}},
            {responsive : {$regex:search , $options  : "i"}},
        ]
    }
    const data = Product.find(query).exec()
    return data
}

module.exports = fetchProduct