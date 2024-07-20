const Product = require("./Product")

const fetchTrendingdeals= async()=>{
  const topDiscountedProducts = await Product.find()
    .sort({ discount: -1 }) 
    .limit(5) 
    .exec();
  return topDiscountedProducts;
}

module.exports = fetchTrendingdeals ;

const fetchTrendingitems= async()=>{
    const topDiscountedProducts = await Product.find()
    .sort({ sold: -1 }) 
    .limit(8) 
    .exec();
  return topDiscountedProducts;
}

module.exports = fetchTrendingitems