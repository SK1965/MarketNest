const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const adminRouter = require('./routes/admin.routes')
const productRouter = require('./routes/product.routes')
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

app.use("/api/v1/admin" , adminRouter)

app.use("/api/v1/product" ,productRouter)

module.exports = app;