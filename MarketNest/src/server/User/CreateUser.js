
const User = require("./User")

async function CreateUser(data) {
    try {
        
        const newUser = new User(data);
        console.log(newUser)
        await newUser.save();
        return "User added successfully";
    } catch (error) {
        return ("Unable to Create user");
    } 
}

module.exports = CreateUser;
