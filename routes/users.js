let express = require('express');
let router = express.Router();
let {index, register, login} = require('../controllers/usersController');

/* GET  */
router.get('/', index)
router.get('/login', login)
router.get('/register', register)


module.exports = router;