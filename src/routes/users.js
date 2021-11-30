let express = require('express');
let router = express.Router();
const {
    register, 
    login, 
    profile , 
    editProfile,
    registerNewUser, 
    loginUser, 
    updateProfile,
    logout,
    deleteProfile,
    forgotPassword,
    fpFindEmail,
    changePassword,
    changeProcess
    } = require('../controllers/usersController');
const reValidator = require('../validations/registerValidator')
const loValidator = require('../validations/loginValidator')
const editProValidator = require('../validations/editProfileValidator')
const forgotPassValidator = require('../validations/forgotPassValidator')
const uploadUserAvatar = require('../middlewares/uploadUserAvatar')
const sessionCheck = require('../middlewares/sessionCheck')
const userLoginCheck = require('../middlewares/userLoginCheck')

/* GET - login */
router.get('/login', userLoginCheck ,login)
router.post('/login', loValidator ,loginUser)
router.get('/logout', sessionCheck, logout)

/* GET - Forgot Password */
router.get('/forgotPassword', forgotPassword)
router.post('/forgotPassword', forgotPassValidator,fpFindEmail)
router.get('/forgotPassword/changePassword' ,changePassword)
router.post('/forgotPassword/changePassword/:id', changeProcess)

/* GET - Register */
router.get('/register', userLoginCheck , register)
router.post('/register', reValidator , registerNewUser)


/* GET - Profile */
router.get('/profile', sessionCheck ,profile)
router.get('/profile/editprofile/:id', /* sessionCheck , */editProfile)
router.put('/profile/editprofile/:id',uploadUserAvatar.single('avatar'), editProValidator ,updateProfile)
router.delete('/profile/delete/:id' ,deleteProfile)

module.exports = router;