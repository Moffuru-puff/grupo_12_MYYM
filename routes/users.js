let express = require('express');
let router = express.Router();
let {register, login, registerNewUser} = require('../controllers/usersController');
let reValidator = require('../validations/registerValidator')


/* GET  */
router.get('/login', login)
router.get('/register', register)

/* POST */

router.post('/register', reValidator ,registerNewUser)



module.exports = router;