const express = require('express');
const ViteExpress = require("vite-express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const CreatorMain = require('./Creator/CreatorMain');
const ProductMain = require("./Products/ProductMain.js");
const UserMain = require("./User/UserMain.js");
const Product = require('./Products/Product');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: 'dolb0no3p', 
  api_key: '254586743273894', 
  api_secret: 'AqYvy_khAWN4iI93eFHBgMLirFI'
});

// MongoDB connection
const connstring = "mongodb+srv://user:Password@marketplace.m1krltd.mongodb.net/MarketNest";
mongoose.connect(connstring);
console.log("MongoDB connected to MarketNest");

// Routes
app.post("/server/creators/createproduct", upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'productFile', maxCount: 1 }
]), async (req, res) => {
    try {
        const { productName, productType, description, price, mrp, format, isResponsive, isCustomizable, creator } = req.body;
        
        // Upload thumbnail to Cloudinary
        const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path);
        
        // Upload images to Cloudinary
        const imageResults = await Promise.all(req.files.images.map(file => cloudinary.uploader.upload(file.path)));
        console.log(thumbnailResult.url)
        console.log(imageResults)
        // Upload product file to Cloudinary (if exists)
        let productFileResult = null;
        if (req.files.productFile) {
            productFileResult = await cloudinary.uploader.upload(req.files.productFile[0].path);
        }

        // Create new product
        const newProduct = new Product({
            name:productName,
            type : productType,
            description : description,
            price : price,
            mrp :mrp,
            discount : (((mrp-price)/mrp)*100),
            format : format,
            responsive :isResponsive,
            customization :isCustomizable,
            creator : creator,
            thumbnail: thumbnailResult.url,
            images: imageResults.map(result => result.url),
            file: productFileResult ? productFileResult.url : null
        });

        // Save product to database
        await newProduct.save();

        res.json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

const initializeApp = async () => {
    // Registration and login data posting to MongoDB
    await CreatorMain(app);

    // Creating post product in MongoDB
    await ProductMain(app);

    // User-related functionality
    await UserMain(app);

    ViteExpress.listen(app, 3000, () =>
        console.log("Server is listening on port 3000..."),
    );
}

initializeApp();