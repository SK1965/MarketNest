const cloudinary = require('cloudinary').v2;
const fs = require("fs")
async function Cloudinary(filepath) {
    // Configuration
     cloudinary.config({ 
        cloud_name: 'dolb0no3p', 
        api_key: '254586743273894', 
        api_secret: 'AqYvy_khAWN4iI93eFHBgMLirFI' // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           localpath , {resource_type :'auto'}
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
 
}

module.exports =  Cloudinary ;