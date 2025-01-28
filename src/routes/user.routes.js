const express = require('express')
const {CreateUser, loginUser, getUser, logoutUser, refreshTokens} = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const verifyJwt = require('../middleware/auth.middleware')
const router = express.Router()

router.route('/create-user').post( upload.fields([{
    name : 'profileImage' , 
    maxCount  :1
}]),CreateUser)
router.route('/login').post(loginUser)
router.route('/get-user').get(verifyJwt ,getUser)
router.route('/logout').get(verifyJwt , logoutUser)
router.route('/refresh-tokens').get(verifyJwt , refreshTokens)
module.exports = router