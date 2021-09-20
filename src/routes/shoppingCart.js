let express = require('express');
let router = express.Router();
let {shoppingCart, shipping, checkout, confirm } = require('../controllers/shoppingCartController');
const sessionCheck = require('../middlewares/sessionCheck')

/* GET  */
router.get('/', sessionCheck, shoppingCart)
router.get('/shipping', sessionCheck, shipping)
router.get('/checkout', sessionCheck, checkout)
router.get('/confirm', sessionCheck, confirm)


module.exports = router;