const AddtoCart = require("./Addtocart.js");
const createUser = require("./CreateUser.js");
const LoginUser = require("./LoginUser.js");
const updateUser = require("./UpdateUser.js");
const UserMain = async(app)=>{
    app.post("/server/marketplace/register" , async(req,res)=>{
        try{
          const result = await createUser(req.body);
          res.json({message : result})
        }catch(error){
          res.json({message : "Server error"})
        }
      })

      app.post("/server/marketplace/login" , async(req,res)=>{
        try{
          const result = await LoginUser(req.body);
          res.json(result)
        }catch(error){
          res.json({message : "Server error"})
        }
      })

      app.post("/server/marketplace/updateuser" , async(req,res)=>{
      
        const result =  await updateUser(req.body)
        res.json(result)
      })

      app.post("/server/marketplace/addtocart" , async(req,res)=>{
        const result = await AddtoCart(req.body)
        res.json(result)
      })
}

module.exports = UserMain ;
