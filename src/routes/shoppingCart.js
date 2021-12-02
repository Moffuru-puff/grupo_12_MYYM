let express = require('express');
let router = express.Router();
let {shoppingCart, shipping, checkout, confirm, deleteProduct , emptyCart } = require('../controllers/shoppingCartController');
const sessionCheck = require('../middlewares/sessionCheck')

/* GET  */
router.get('/', sessionCheck, shoppingCart)
router.delete('/deleteOne/:id', sessionCheck, deleteProduct)
router.delete('/deleteAll/:id', sessionCheck, emptyCart)
router.get('/shipping', sessionCheck, shipping)
router.get('/checkout', sessionCheck, checkout)
router.get('/confirm', sessionCheck, confirm)


module.exports = router;