const User = require("./User")
const mongoose = require("mongoose")
const updateUser = async(data)=>{
    
    try {
        console.log(data.data)
        const updatedProduct = await User.findOneAndUpdate(
          { _id: new Object(data.id) } ,   // Filter
          data.data,           // Update data
          { new: true }         // Return the updated document
        )
        return updatedProduct;
      } catch (error) {
        console.log(error)
        return {message : "error"}
      }
}

module.exports = updateUser;