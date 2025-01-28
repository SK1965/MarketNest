const express  = require('express')
const {CreateProduct, deleteProduct, updateProduct} = require('../controllers/product.controller')
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


module.exports = router