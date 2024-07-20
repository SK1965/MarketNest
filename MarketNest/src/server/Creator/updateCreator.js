const Creator = require("./Creator")
const mongoose = require("mongoose")
const updateCreator = async(data)=>{
    
    try {
        const updatedProduct = await Creator.findOneAndUpdate(
          { _id: new Object(data.id) } ,   // Filter
          data.data,           // Update data
          { new: true }         // Return the updated document
        )
        return updatedProduct;
      } catch (error) {
        return {message : "error"}
      }
}

module.exports = updateCreator;