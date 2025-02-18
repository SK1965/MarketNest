const mongoose = require('mongoose');
const {DB_NAME} = require('../constants');

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)  
        console.log(`Mongodb connected! || HOST_NAME : ${connectionInstance.connection.host}`);
        
    } catch (error) {
         console.log("mongoDB connection Failed...!" , error);
         process.exit(1);
    }
}

module.exports = connectDB;