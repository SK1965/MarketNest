const AsyncHandler = require('../utils/AsyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const User = require('../models/user.model')
const uploadOnCloudinary = require('../utils/cloudinary')
const Cart = require('../models/cart.model')
const { default: mongoose } = require('mongoose')
const options = {
    httpOnly : true , 
    secure  : true,
    sameSite: 'None'
}
const generateAccessAndRefreshToken = async(userid)=>{
    const user  =await User.findById(userid)

    if(!user){
        throw new ApiError(500 , "user address failed")
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

const updateUser = AsyncHandler(async (req, res) => {
    const { fullname, username, email, aboutMe } = req.body;
  
    // Check if the user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // Check if the new username or email is already taken by another user
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "Username already taken");
      }
    }
  
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "Email already taken");
      }
    }
  
    // Update user details
    if (fullname) user.fullname = fullname;
    if (username) user.username = username;
    if (email) user.email = email;
    if (aboutMe) user.aboutMe = aboutMe;
  
    // Save the updated user
    const updatedUser = await user.save({ validateBeforeSave: false });
  
    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  });

  const updateProfileImage = AsyncHandler(async (req, res) => {
    // Check if the user exists
    const user = req.user;
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // Check if a file was uploaded
    if (!req.files) {
      throw new ApiError(400, "Profile image file is required");
    }
  
    // Upload the new profile image to Cloudinary
    const profileImagePath = req.files.profileImage[0].path;
    const profileImage = await uploadOnCloudinary(profileImagePath);
  
    if (!profileImage) {
      throw new ApiError(500, "Failed to upload profile image");
    }
  
    // Update the user's profile image
    user.profileImage = profileImage
    // Save the updated user
    await user.save();
    const updatedUser = await User.findById(user._id)
   // console.log(updatedUser)
    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Profile image updated successfully"));
  });

const loginUser = AsyncHandler(
    async(req,res)=>{
        const {username , email , password} =  req.body

        if(!username && !email){
            throw(new ApiError(404, "Username / Email not found"))
        }
        const user = await User.findOne(
            {$or : [{username} , {email}]}
        )
        if(!user){
            throw new ApiError(401 , "username / password is wrong")
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
        .json(new ApiResponse(200 , req.user , "user fetched"))
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
        const user = req.user
        const {accessToken ,refreshToken} = await generateAccessAndRefreshToken(user._id)
        user.refreshToken = refreshToken

        await user.save()
        res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200,user,"tokens refreshed"))
    }
)
const addToCart = AsyncHandler(
    async(req ,res)=>{
        const user = req.user?._id
        const product =new mongoose.Types.ObjectId(req.params.id)

        console.log(user , product)

        const isexist = await Cart.findOne(
            {$and : [{user} , {product}]}
        )

        console.log(isexist)

        if(isexist){
            res
            .status(300)
            .json(new ApiResponse(300 , {} , "item already in cart"))
        }
        
        try {
            const cart =await Cart.create({
                product ,
                user
            })
    
        const createdCart = await Cart.findById(cart._id)

        //const myCart = await Cart.find({user:req.user._id})

        const mycart = await Cart.aggregate([
            {
                $match: { user: user }  // Match carts for the specific user
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                    pipeline: [
                        {
                            $lookup: {
                                from: "admins",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner"
                            }
                        },
                        {
                            $unwind: { path: "$owner", preserveNullAndEmptyArrays: true }
                        },
                        {
                            $set: {
                                owner: "$owner._id"  // Replace owner object with username
                            }
                        }
                    ]
                }
            },
            {
                $unwind: { path: "$product", preserveNullAndEmptyArrays: true }  // Flatten the "product" array
            },
            {
                $group: {
                    _id: null,  // Group all documents into a single group
                    products: { $push: "$product" }  // Collect all products into an array
                }
            },
            {
                $unwind: "$products"  // Unwind the `products` array into individual documents
            },
            {
                $replaceRoot: {
                    newRoot: "$products"  // Replace the root document with the `products` array
                }
            }
        ]);
        console.log(mycart);
        
        res
        .status(200)
        .json(new ApiResponse(200 , mycart , "Item Added to Cart"))
        } catch (error) {
            throw new ApiError(500 , "Add to cart failed")
        }
    }
)
const myCart = AsyncHandler(
    async(req,res)=>{
        const user = req.user._id

        const mycart = await Cart.aggregate([
            {
                $match: { user: user }  // Match carts for the specific user
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                    pipeline: [
                        {
                            $lookup: {
                                from: "admins",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner"
                            }
                        },
                        {
                            $unwind: { path: "$owner", preserveNullAndEmptyArrays: true }
                        },
                        {
                            $set: {
                                owner: "$owner._id"  // Replace owner object with username
                            }
                        }
                    ]
                }
            },
            {
                $unwind: { path: "$product", preserveNullAndEmptyArrays: true }  // Flatten the "product" array
            },
            {
                $group: {
                    _id: null,  // Group all documents into a single group
                    products: { $push: "$product" }  // Collect all products into an array
                }
            },
            {
                $unwind: "$products"  // Unwind the `products` array into individual documents
            },
            {
                $replaceRoot: {
                    newRoot: "$products"  // Replace the root document with the `products` array
                }
            }
        ]);

      
      
        res
        .status(200)
        .json(new ApiResponse(200, mycart ,"this is your cart"))
    }
)

const removeFromCart = AsyncHandler(
    async(req,res)=>{
        const user = req.user
        const id =new mongoose.Types.ObjectId(req.params.id)

        try {
            await Cart.findOneAndDelete({
                $and  : [{user} , {product : id}]
            })
    
            const mycart = await Cart.aggregate([
                {
                    $match: { user: user }  // Match carts for the specific user
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "admins",
                                    localField: "owner",
                                    foreignField: "_id",
                                    as: "owner"
                                }
                            },
                            {
                                $unwind: { path: "$owner", preserveNullAndEmptyArrays: true }
                            },
                            {
                                $set: {
                                    owner: "$owner._id"  // Replace owner object with username
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: { path: "$product", preserveNullAndEmptyArrays: true }  // Flatten the "product" array
                },
                {
                    $group: {
                        _id: null,  // Group all documents into a single group
                        products: { $push: "$product" }  // Collect all products into an array
                    }
                },
                {
                    $unwind: "$products"  // Unwind the `products` array into individual documents
                },
                {
                    $replaceRoot: {
                        newRoot: "$products"  // Replace the root document with the `products` array
                    }
                }
            ]);
            res
            .status(200)
            .json(new ApiResponse(200 , mycart , "removed from cart successfull"))
        } catch (error) {
            throw new ApiError(500,"Item Not Removed")
        }
    }
)


module.exports = {CreateUser , loginUser ,getUser , logoutUser , refreshTokens , myCart , addToCart , removeFromCart ,updateProfileImage,updateUser}