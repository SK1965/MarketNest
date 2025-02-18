const express  = require('express')
const {CreateProduct, deleteProduct, updateProduct, addMultiProducts, getProducts, trending, categories, searchProducts, getProduct} = require('../controllers/product.controller')
const upload = require('../middlewares/multer.middleware')
const verifyJwt = require('../middlewares/auth.middleware')

const router = express.Router()

router.route("/createproduct").post(
    upload.fields(
        [
            {name : "thumbnail" , maxCount : 1},
            {name : "images" , maxCount : 5},
            {name :"file" , maxCount : 1}
        ]
    ),
    verifyJwt , CreateProduct)

router.route("/").delete(deleteProduct)

router.route("/getproduct").get(getProducts)

router.route("/trending").get(trending )

router.route("/categories").get(categories )
router.route("/search").get(searchProducts)
router.route("/getproduct/:id").get(getProduct)
//testing

router.route("/addmulti").post(verifyJwt,addMultiProducts)



module.exports = router