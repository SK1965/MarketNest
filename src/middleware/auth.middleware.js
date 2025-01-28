const jwt  = require('jsonwebtoken')
const AsyncHandler = require("../utils/AsyncHandler");
const User = require('../models/user.model');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');

const verifyJwt = AsyncHandler(
    async(req,res,next)=>{
        const {accessToken , refreshToken} =  req.cookies

        if(!accessToken || !refreshToken){
            throw new ApiError(401 , "unauthorized Access 1")
        }
        try {
            const decodedAccessToken = await jwt.decode(accessToken , process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodedAccessToken.id).select("-password")
            
            if(user.refreshToken != refreshToken){
                throw new ApiError(401 , "unauthorized access 2")
            }
            
            
            req.user = user
            next();
        } catch (error) {
            throw new ApiError(401, "unauthorized access 3")
        }
        
    }
)

module.exports = verifyJwt