const express = require("express")
const {
        registerAdmin, 
        loginAdmin, 
        getAdmin,
        logoutAdmin, 
        UpdaterefreshToken,
        updateAdmin, 
        changeCurrentPassword, 
        ChangeProfilePhoto ,
        getOrders 
      } = require("../controllers/admin.controller")

const verifyJwt = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")
const router = express.Router()


router.route('/register').post(
                                upload.fields(
                                               [{name :'profileImage', maxCount : 1}]
                                             ) ,
                                registerAdmin
                              )
router.route('/login').post(loginAdmin)
router.route('/get-user').get(verifyJwt,getAdmin)
router.route('/logout').get(verifyJwt ,logoutAdmin)
router.route('/refresh-token').get(verifyJwt , UpdaterefreshToken)
router.route('/update').post(verifyJwt , updateAdmin)
router.route('/change-password').post(verifyJwt , changeCurrentPassword)
router.route("/change-profile-photo").post(
                                           upload.fields(
                                                         [{name : 'profileImage' ,maxCount:1}]
                                                        ),
                                            verifyJwt, 
                                           ChangeProfilePhoto
                                         )
router.route("/get-orders").get(verifyJwt , getOrders)


module.exports = router ; 