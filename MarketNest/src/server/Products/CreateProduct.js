const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const Product = require('./Product');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: 'your_cloud_name', 
    api_key: 'your_api_key', 
    api_secret: 'your_api_secret'
});

// MongoDB connection

app.post("http://localhost:3000/server/creators/createproduct", upload.fields([
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
        
        // Upload product file to Cloudinary (if exists)
        let productFileResult = null;
        if (req.files.productFile) {
            productFileResult = await cloudinary.uploader.upload(req.files.productFile[0].path);
        }

        // Create new product
        const newProduct = new Product({
            productName,
            productType,
            description,
            price,
            mrp,
            format,
            isResponsive,
            isCustomizable,
            creator,
            thumbnailUrl: thumbnailResult.secure_url,
            imageUrls: imageResults.map(result => result.secure_url),
            productFileUrl: productFileResult ? productFileResult.secure_url : null
        });

        // Save product to database
        await newProduct.save();

        res.json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});
