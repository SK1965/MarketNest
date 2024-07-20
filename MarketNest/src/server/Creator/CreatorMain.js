const CreateCreator = require("./CreateCreator");
const LoginCreator = require("./LoginCreator");
const updateCreator = require("./updateCreator");

const CreatorMain= async(app) =>{
    app.post("/server/creators/register" , async(req,res)=>{
        try {
          const result = await CreateCreator(req.body);
              res.json({ message: result });
          
      } catch (error) {
          res.json({ message: "Server error" });

      }
      })

    app.post("/server/creators/login" , async(req,res)=>{
         try{
           
          const Status = await LoginCreator(req.body)
          res.json(Status)
         }catch(e){

         }
    } )

    app.post("/server/updatecreator" , async(req,res)=>{
        try{
            console.log(req.body)
             const result =  await updateCreator(req.body)
            
            res.json(result)
        }catch(e){}
})

}

module.exports = CreatorMain