require('dotenv').config({path : './.env'});
const app = require('./app');
const connectDB = require('./db');
 
connectDB()
.then(()=>
    {
    app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT} `));
    })
.catch((err)=>
    {
        console.log("MONGODB connection Failed",err)
    });
