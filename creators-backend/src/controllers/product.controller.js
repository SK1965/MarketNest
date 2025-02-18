const AsyncHandler = require("../utils/AsyncHandler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const cloudinary = require("../utils/cloudinary")
const Product = require('../models/product.model')
const mongoose  = require("mongoose")


const CreateProduct  = AsyncHandler(
    async(req,res)=>{
        
           const { name,
            category,
            description,
            price } =  req.body

            const owner = req.user._id;
            if(!name || !owner || !category || !description || !price ){
                throw new ApiError(404 ,"product Data not found")
            }

            const isProductExists = await Product.findOne({
                $and : [{name} , {category} , {price}]
            })
            if(isProductExists){
                throw new ApiError(301 , "Product already exists")
            }

            const thumbnailpath = req.files.thumbnail[0].path
            const filepath = req.files.file[0].path
            const imagespath = req.files.images

            if(!thumbnailpath){
                throw new ApiError(404 , "thumbnail image not found")
            }
            if(!filepath){
                throw new ApiError(404 , "product file not found")
            }
            if(!imagespath){
                throw(new ApiError(404 , "Image files not found!"))
            }
            const thumbnailcloudpath =await cloudinary(thumbnailpath)
            const filecloudpath = await cloudinary(filepath)

            const thumbnail = thumbnailcloudpath.url
            const file = filecloudpath.url
            let images = []
            for (const element of imagespath) {
                const localpath = element.path;
                const cloudpath = await cloudinary(localpath); 
                images.push(cloudpath.url);
            }
        
        try {
            const product =await Product.create(
                {
                    name,
                    category,
                    owner,
                    description,
                    price,
                    thumbnail,
                    images,
                    file
                }
            )   

            const createdProduct = await Product.findById(product._id)

            res
            .status(200)
            .json(new ApiResponse(200 , createdProduct , "product created successfull"))
        } catch (error) {
            throw new ApiError(500 , "product creation failed")
        }
    }
)

const deleteProduct = AsyncHandler(
    async(req,res)=>{
        const productId = req.query.id
        const product = await Product.findById(new mongoose.Types.ObjectId(productId))
        
        if(!product){
            throw new ApiError(404 , "Product Not Exists")
        }
        console.log(product)
        const deletedProduct = await Product.findByIdAndDelete(product._id).catch(err=>{console.log(err)})
        console.log(deletedProduct)
        if(!deletedProduct){
            throw new ApiError(500 , "Product delete Failed")
        }

        res
        .status(200)
        .json(new ApiResponse(200 , {} , "Deleted product SuccessFull"))
    }
)
const updateProduct = AsyncHandler(
    async(req,res)=>{
        const {id,name,
            category,
            description,
            price,
             } = req.body;

            const thumbnailpath = req.files.thumbnail[0].path
            const filepath = req.files.file[0].path 
            const imagespath = req.files.images
            if(!name && !owner && !category && !description && !price ){
                throw new ApiError(404 ,"product Data not found")
            }
            let thumbnailcloudpath
            if(thumbnailpath){
                thumbnailcloudpath =await cloudinary(thumbnailpath)
            }
            let filecloudpath
            if(filepath){
                filecloudpath = await cloudinary(filepath)

            }
            let images = []
            if(imagespath){   
            for (const element of imagespath) {
                const localpath = element.path;
                const cloudpath = await cloudinary(localpath); 
                images.push(cloudpath.url);
            }
            }

            const thumbnail = thumbnailcloudpath.url
            const file = filecloudpath.url
            
            const product = await Product.findById(id);
            
            if(!product){
                throw new ApiError(404 , "product not Updated")
            }
            const updateproduct = {
                name : name || product.name ,
                category : category || product.category,
                description : description || product.description ,
                price  : price || product.price ,
                thumbnail : thumbnail || product.thumbnail ,
                file : file || product.file,
                images  : [...product.images , images]
            }
        
            try {
                await updateProduct.save()
    
                const updatedProduct = await Product.findById(id)
    
                res
                .status(200)
                .json(new ApiResponse(200, updatedProduct , "product updated successfull"))
            } catch (error) {
                throw new ApiError(500 , "Product not Updated")
            }
    }

)

const trending = AsyncHandler(
    async(req,res)=>{
        let products = await Product.find()
        const trending = products.slice(0,5)
        res
        .status(200)
        .json(new ApiResponse(200  , trending , "products fetched successfully"))
    }
)

const categories = AsyncHandler(
    async(req,res)=>{
        let products = await Product.find()
        const categories = products.slice(5,17) ||[]
        res
        .status(200)
        .json(new ApiResponse(200  , categories , "products fetched successfully"))
    }

)

const searchProducts = AsyncHandler(
    async(req,res)=>{
        const data =  req.query.item
        const products = await Product.find({
            $or: [
                { name: { $regex: data, $options: 'i' } },  
                { description: { $regex: data, $options: 'i' } }, 
                { category: { $regex: data, $options: 'i' } }  
              ]
        })

        console.log(products);
        res.status(200).json(new ApiResponse(200,products , "fetched products"))
    }
)


//for testing
const getProducts = AsyncHandler(
    async (req,res)=>{
        const products = await Product.find()
       
        
        res
        .status(200)
        .json(new ApiResponse(200  , products , "products fetched successfully"))
    }
)

const getProduct = AsyncHandler(
    async (req,res)=>{
        const id = new mongoose.Types.ObjectId(req.params)

        if(!id){
            throw new ApiError(404 , "Product not found")
        }

        try {
            const product = await Product.findById(id);
            if(!product){
            throw new ApiError(404 , "Product not found")
            }
            res
            .status(200)
            .json(new ApiResponse(200 , product, "product fetched"))
        } catch (error) {
           throw new ApiError(500 , "Server Error") 
        }
        
    }
)





const addMultiProducts =  AsyncHandler(
    async(req,res)=>{
        const products = req.body

        const createdProducts = []
        
        for (const element of products) {
            element.owner = req.user;
        
            console.log(element);
            const {
                name,
                category,
                owner,
                description,
                price,
                thumbnail,
                images,
                file
            } = element;
        
            try {
                const product = await Product.create({
                    name,
                    category,
                    owner,
                    description,
                    price,
                    thumbnail,
                    images,
                    file
                });
        
                createProducts.push(product);
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
        

        res
        .status(200)
        .json(new ApiResponse(200 ,createdProducts , "added successfully" ))
    }
)

module.exports = {CreateProduct , deleteProduct, updateProduct ,addMultiProducts , getProducts , trending ,categories , searchProducts ,getProduct}