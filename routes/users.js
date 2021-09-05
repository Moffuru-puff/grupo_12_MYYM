let express = require('express');
let router = express.Router();
let {register, login, profile , editProfile ,registerNewUser} = require('../controllers/usersController');
let reValidator = require('../validations/registerValidator')


/* GET  */
router.get('/login', login)
router.get('/register', register)
router.get('/profile', profile)
router.get('/profile/editprofile', editProfile)

/* POST */

router.post('/register', reValidator ,registerNewUser)



module.exports = router;