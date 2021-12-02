let express = require('express');
let router = express.Router();
let {produc,cart,valorationProduct} = require('../controllers/producController');
const sessionCheck = require('../middlewares/sessionCheck')

/* GET  */
router.get('/:id', produc)
router.post('/addProduct/:id', sessionCheck,cart)

router.post('/:id',valorationProduct)


module.exports = router;