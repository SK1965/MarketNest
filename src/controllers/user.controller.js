const AsyncHandler = require('../utils/AsyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const User = require('../models/user.model')
const uploadOnCloudinary = require('../utils/cloudinary')
const options = {
    httpOnly : true , 
    secure  : true
}
const generateAccessAndRefreshToken = async(userid)=>{
    const user  =await User.findById(userid)

    if(!user){
        throw new ApiError(500 , "something went wrong in generation of tokens")
    }
    const accessToken  = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    return {accessToken ,refreshToken}
}
const CreateUser = AsyncHandler(async(req,res)=>{
    const {fullname,username ,email,  password  } = req.body

    if(!fullname || !username || !email  || !password){
       throw new ApiError(400 , "user data missing")
    }

    const existedUser = await User.findOne(
        {
           $or : [{username} , {email}]
        }
    )

    if(existedUser){
        throw new ApiError(300 , "User Exists")
    }
    const profileImagepath = req.files.profileImage[0].path
    console.log(profileImagepath);
    
    let profileImage;
    if(profileImagepath){
        profileImage = await uploadOnCloudinary(profileImagepath)
    }

    try {
        const user  = await User.create(
            {
                fullname , username , email , password , profileImage
            }
        )
       
    
        const CreatedUser  = await User.findById(user._id)
    
        res
        .status(200)
        .json(new ApiResponse(200 ,CreatedUser , "User Created Successfully"))
    } catch (error) {
        throw new ApiError(500 , "User Creation Failed")
    }

})

const loginUser = AsyncHandler(
    async(req,res)=>{
        const {username , email , password} =  req.body

        if(!username && !email){
            throw(new ApiError(404 , "Username / Email not found"))
        }
        const user = await User.findOne(
            {$or : [{username} , {email}]}
        )
        if(!user){
            throw new ApiError(404 , "username / password is wrong")
        }
        const isPasswordCorrect  =await user.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            throw new ApiError(404 , "Password is wrong")
        }
        const {accessToken ,refreshToken} = await generateAccessAndRefreshToken(user._id)
       
        user.refreshToken = refreshToken
        await user.save()
        res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200, user  , "login Successfull"))
        }

)
const getUser  =AsyncHandler(
    async(req , res)=>{
        res
        .status(200)
        .json(req.user)
    }
)

const logoutUser = AsyncHandler(
    async(req,res)=>{
        const user = req.user
        user.refreshToken = null
        await user.save()
        
        res
        .status(200)
        .cookie('accessToken')
        .cookie('refreshToken')
        .json(new ApiResponse(200 , {} , "logout successfull"))
    }
)
const refreshTokens = AsyncHandler(
    async(req,res)=>{
        const user = req.body
        const {accessToken ,refreshToken} = generateAccessAndRefreshToken(req._id)
        user.refreshToken = refreshToken

        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200,"login Successfull"))
    }
)
module.exports = {CreateUser , loginUser ,getUser , logoutUser , refreshTokens}