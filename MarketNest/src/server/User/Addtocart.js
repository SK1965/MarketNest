const User = require("./User")

async function AddtoCart(data){
    try{
    const updatedProduct = await User.findOneAndUpdate(
        { _id: new Object(data.id) } ,   // Filter
        {mycart : data.cart},           // Update data
        { new: true }         // Return the updated document
      )
      return updatedProduct;
    } catch (error) {
      console.log(error)
      return {message : "error"}
    }
}

module.exports = AddtoCart;