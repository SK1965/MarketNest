const Creator = require('./Creator');

const LoginCreator = async(data)=>{
    try{
     const user = await Creator.find({email :data.email}).exec()
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

  module.exports = LoginCreator;