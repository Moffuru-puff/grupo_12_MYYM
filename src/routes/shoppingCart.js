let express = require('express');
let router = express.Router();
let {shoppingCart, shipping, checkout, confirm } = require('../controllers/shoppingCartController');

/* GET  */
router.get('/', shoppingCart)
router.get('/shipping', shipping)
router.get('/checkout', checkout)
router.get('/confirm', confirm)


module.exports = router;