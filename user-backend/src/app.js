const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app  = express()
const userRouter = require('./routes/user.routes')
app.use(cors({
    origin  :process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'))
app.use(cookieParser())

app.use("/api/v1/user",userRouter)

module.exports = app;