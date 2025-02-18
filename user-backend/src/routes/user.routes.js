const express = require('express')
const {CreateUser, loginUser, getUser, logoutUser, refreshTokens, myCart, addToCart, removeFromCart, updateUser, updateProfileImage} = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const verifyJwt = require('../middleware/auth.middleware')
const { payment } = require('../controllers/payment.controller')
const router = express.Router()

router.route('/create-user').post( upload.fields([{
    name : 'profileImage' , 
    maxCount  :1
}]),CreateUser)
router.route('/login').post(loginUser)
router.route('/get-user').get(verifyJwt ,getUser)
router.route('/logout').get(verifyJwt , logoutUser)
router.route('/refresh-tokens').get(verifyJwt , refreshTokens)
router.route('/cart').get(verifyJwt , myCart )
router.route('/addtocart/:id').get(verifyJwt ,addToCart)
router.route('/removefromcart/:id').delete(verifyJwt , removeFromCart)

//updateuserdata
router.route('/update-user').put(verifyJwt , updateUser)
router.route('/update-profile').put(
                                    verifyJwt , 
                                    upload.fields([{
                                        name : 'profileImage' , 
                                        maxCount  :1
                                    }]),
                                    updateProfileImage
                                )


//handling payment

router.route('/payment').post(payment)
module.exports = router