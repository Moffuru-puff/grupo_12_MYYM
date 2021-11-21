let express = require('express');
let router = express.Router();
let controller = require('../controllers/producController');
const sessionCheck = require('../middlewares/sessionCheck')

/* GET  */
router.get('/:id', controller.produc)
router.post('/:id', sessionCheck,controller.cart)


module.exports = router;