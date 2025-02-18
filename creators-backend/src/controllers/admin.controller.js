const AsyncHandler = require("../utils/AsyncHandler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const Admin = require("../models/admin.model")
const Order = require("../models/order.model")
const cloudinary = require("../utils/cloudinary")

const options = {
            httpOnly : true,
            secure  : true
                }
const generateAccessAndRefreshToken =  async(adminid)=>{

    const admin =  await Admin.findById(adminid);

    if(!admin){
        throw new ApiError(400 , "AdminNotfound")
    }
try {
    
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()
        
        admin.refreshToken = refreshToken
        await admin.save()
    
        return {accessToken , refreshToken}
} catch (error) {
    throw new ApiError(500 , "access token and refresh token generation failed",error)
}
    }

const registerAdmin = AsyncHandler(
    async(req,res)=>{
        const {username,password,email,aboutAdmin} = req.body

        if(!username){
            throw new ApiError(400 , "username not found")
        }

        if(!password){
            throw new ApiError(400 , "password not found")
        }

        if(!email){
            throw new ApiError(400 , "email not found")
        }
        
        const existedUser = await Admin.findOne({
            $or : [{username} , {email}]
        })

        if(existedUser){
            throw new ApiError(409 , "user already exists")
        }
        const ProfilePhotopath = req.files?.profileImage[0].path;

        let profilePhoto = ""
        if(ProfilePhotopath){
             
            try {
                const cloudinaryPath = await cloudinary(ProfilePhotopath)
    
                if(!cloudinaryPath){
                    throw ApiError(500 , "profile photo upload failed")
                }
                
                profilePhoto = cloudinaryPath.url
            } catch (error) {
                throw ApiError(500 , "server error")
            }
        }

        let about = ""

        if(!aboutAdmin){
            about = aboutAdmin 
        }
        
            const admin  = await Admin.create({
                username : username.toLowerCase() ,
                password ,
                email ,
                about,
                profilePhoto 
            })

            if(!admin){
                throw new ApiError(500,"Admin Creation Failed")
            }

            res
            .status(201)
            .json(new ApiResponse(200 ,{},"Admin Created SuccessFull"))
        
    }
)

const loginAdmin = AsyncHandler(
    async(req,res)=>{
        const {username ,email , password } = req.body

        if(!username && !email){
            throw new ApiError(400 ,"username or email not found")
        }

        if(!password){
            throw new ApiError(400 , "password not found")
        }
        const admin = await Admin.findOne({
            $or : [{username} , {email}]
        })

        if(!admin){
            throw new ApiError(401 , "user not exists")
        }

        const ispasswordCorrect = await admin.isPasswordCorrect(password)

        if(!ispasswordCorrect){
            throw new ApiError(401 , "wrong passeword")
        }

        const loggedInAdmin = await Admin.findOne({
            username
        }).select("-password")
        
        const {accessToken , refreshToken}  = await generateAccessAndRefreshToken(loggedInAdmin._id)

        
        if(!accessToken){
            throw new ApiError(500 , "access token generation failed")
        }
        
       
        if(!refreshToken){
            throw new ApiError(500 , "refresh token generation failed")
        }
        
        res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(201 ,loggedInAdmin , "login successfull"))
    }
)

const logoutAdmin  =AsyncHandler(
    async(req,res)=>{
        const logout = await Admin.findByIdAndUpdate({ _id : req.user._id},
            {
                $unset : {refreshToken : null}
            }
        )
        if(!logout){
            throw(ApiError(500 ,"server error Logout failed"))
        }
        res
        .status(200)
        .cookie("accessToken")
        .cookie("refreshToken")
        .json(new ApiResponse(209 , {}, "logout Successfull"))
    }
)
const getAdmin =AsyncHandler(
    async(req,res)=>{
        const admin = req.user
        res
        .status(200)
        .json(new ApiResponse(200 , admin , "successfully fetched user"))
    }
)

const UpdaterefreshToken = AsyncHandler(
    async(req, res)=>{
        const admin = req.user;

        const {accessToken , refreshToken} =  await generateAccessAndRefreshToken(admin._id)

        admin.refreshToken = refreshToken

        admin.save()
        res
        .status(202)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken", refreshToken , options)
        .json(new ApiResponse(200 , {refreshToken} , "Token Refreshed" ))
    }
)

const updateAdmin = AsyncHandler(
    async(req , res)=>{
        const {username , email , mobile , about} = req.body
        const admin = req.user
        if(email){
            admin.email =email 
        }

        if(username){
            admin.username = admin
        }

        if(mobile){
            admin.mobile = mobile
        }

        if(about){
            admin.about = about
        }

        try {
            await admin.save()
    
            const updatedAdmin =  await Admin.findById(admin._id).select("-password");
            
            res
            .status(200)
            .json(new ApiResponse(200 , updatedAdmin , "Admin updated"))
        } catch (error) {
            throw new ApiError(500 , "profile Update Failed")
        }
    }
)

const changeCurrentPassword = AsyncHandler(
    async(req,res)=>{
        const {oldpassword ,newpassword} = req.body
        const admin  = req.user
        
        const ispasswordCorrect =  await admin.isPasswordCorrect(oldpassword)
        if(!ispasswordCorrect){
            throw new ApiError(404 , "Password is wrong")
        }

        try {
            admin.password = newpassword 
            await admin.save({ValidateBeforeSave : false})
            
            const updatedAdmin = await Admin.findById(admin._id).select("-password");
    
            res
            .status(200)
            .json(new ApiResponse(200 , updatedAdmin , "Admin Updated Successfully"))
        } catch (error) {
            throw new ApiError(500 , "password update failed")
        }
    }
)

const ChangeProfilePhoto = AsyncHandler(
    async(req,res)=>{
        const admin = req.user
        const profileImagePath = req.files.profileImage[0].path

        if(!profileImagePath){
            throw new ApiError(404 , "Image not found")
        }

        const Profilepath = cloudinary(profileImagePath)

        if(!Profilepath.url){
            throw ApiError(500 , "Image Upload Failed")
        }

        admin.profileImage = Profilepath.url

        try {
            await admin.save()
    
            const updatedAdmin = await Admin.findById(admin._id).select("-password")
    
            res
            .status(200)
            .json(new ApiResponse(200 , updatedAdmin, "Profile Image update successfull"))
        } catch (error) {
            throw ApiError(500 , "Image Update Failed")
        }
    }
)

const getOrders = AsyncHandler(
    async(req ,res)=>{
        const orders = await Order.aggregate([
            {
                $match : {Owner : req.user._id}
            },
            {
                $lookup : {
                    from : "products",
                    localField : "ProductId",
                    foreignField : "_id",
                    as : "product"
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "userId",
                    foreignField : "_id",
                    as : "user"
                }
            },
            {
                $project : {
                    product : 1 ,
                    user : 1
                }
            }
        ])

        console.log(orders);
        

        res
        .status(200)
        .json(new ApiResponse(200 , orders , "Orders Fetched Successfully"))
    }
)

//for testing purposes


module.exports  = {
                    registerAdmin,
                    loginAdmin ,
                    logoutAdmin , 
                    getAdmin , 
                    UpdaterefreshToken , 
                    updateAdmin , 
                    changeCurrentPassword , 
                    ChangeProfilePhoto,
                    getOrders
                  }