let express = require('express');
let router = express.Router();
let controller = require('../controllers/producController');

/* GET  */
router.get('/detalleDelProducto', controller.index)


module.exports = router;