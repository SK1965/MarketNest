const jwt  = require('jsonwebtoken')
const AsyncHandler = require("../utils/AsyncHandler");
const Admin = require('../models/admin.model');
const { default: mongoose, mongo } = require('mongoose');
const ApiError = require('../utils/ApiError');

const verifyJwt = AsyncHandler(
    async(req,res,next)=>{
        const {accessToken , refreshToken} =  req.cookies
        if(!accessToken || !refreshToken){
            throw new ApiError(401 , "unauthorized Access")
        }
        try {
            const decodedAccessToken = await jwt.decode(accessToken , process.env.ACCESS_TOKEN_SECRET)
            const admin = await Admin.findById(new mongoose.Types.ObjectId(decodedAccessToken.id))
            
            if(admin.refreshToken != refreshToken){
                throw new ApiError(401 , "unauthorized access")
            }
            
            req.user = admin
            next();
        } catch (error) {
            throw new ApiError(401, "unauthorized access")
        }
        
    }
)

module.exports = verifyJwt