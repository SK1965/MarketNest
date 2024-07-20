const User = require("./User")

const LoginUser = async(data)=>{
    try{
        const user = await User.find({email :data.email}).exec()
        if(user[0].email == data.email){
           if(user[0].password == data.password){
               return ({message :"Login Sucessfull" , user : user[0]});
           }else{
               return ({message:"Password not mathed"});
           }
           
        }else{
           return({message:"User Email Not Found"});
        }
   
       }catch(e){
           
       }
}

module.exports = LoginUser;