const CreateProduct = require("./CreateProduct.js");
const fetchProductbyId = require("./fetchProductbyId.js");

const fetchProduct = require("./fetchProducts.js");
const fetchTrendingitems = require("./fetchTrending.js");
const fetchTrendingdeals = require("./fetchTrending.js");

const ProductMain = async(app)=>{
   
    app.post("/server/products",async(req,res)=>{
        try{
            const result = await fetchProduct(req.body.search);
            res.json(result)
        }catch{
            res.json({message : "ServerError"})
        }
    })

    app.post("/server/productsbyid",async(req,res)=>{
        try{
            const result = await fetchProductbyId(req.body.search); 
            res.json({products : result})
        }catch(error){
            console.log(error)
            res.json({message : "ServerError"})
        }
    })

    app.get("/server/marketplace/deals",async(req,res)=>{
        const result = await fetchTrendingdeals() ; 
        res.json({result : result})
    })

    app.get("/server/marketplace/trending",async(req,res)=>{
        const result = await fetchTrendingitems() ; 
        res.json({result : result})
    })
    
}


module.exports = ProductMain;