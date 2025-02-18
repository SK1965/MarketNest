require('dotenv').config({path : './.env'});
const app = require('./app');
const connectDB = require('./db');


connectDB()
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`app listening on http://localhost:${process.env.PORT}`);
    })
})
.catch(()=>{
    console.log("MonogDB connection failed"); 
})