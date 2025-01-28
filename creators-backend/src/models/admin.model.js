const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    } ,
    email : {
        type : String , 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    mobile : {
        type :String , 
        unique: true ,
    } , 

    profilePhoto : {
        type : String
    } , 
    password : {
        type : String , 
        required : [true , 'Password is required'],
    },
    about :{
        type : String
    },
    refreshToken : {
        type : String
    },

},
{
    timestamps : true,
}
);

adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
    else{
        return next();
    }
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}
adminSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id : this._id,
        username : this.username,
        email : this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

module.exports = mongoose.model('Admin',adminSchema);
