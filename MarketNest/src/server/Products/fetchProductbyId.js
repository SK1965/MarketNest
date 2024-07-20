const Product = require("./Product")


const fetchProductbyId = async(ids)=>{
    console.log(ids)
    try{
    const promises = ids.map(id => Product.findOne({ _id: new Object(id) }).exec());
    data = await Promise.all(promises)
    
    return data
    }catch(e){}
}

module.exports = fetchProductbyId ;