let express = require('express');
let router = express.Router();
let {produc,cart,valorationProduct,} = require('../controllers/producController');
let {addFavorite} = require('../controllers/favoritesController');
const sessionCheck = require('../middlewares/sessionCheck')

/* GET  */
router.get('/:id', produc)
router.post('/addProduct/:id', sessionCheck,cart)

router.post('/:id', sessionCheck, valorationProduct)

router.post('/favorites/addOrDelete/:id', addFavorite); 



module.exports = router;