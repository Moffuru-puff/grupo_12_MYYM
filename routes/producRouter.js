let express = require('express');
let router = express.Router();
let controller = require('../controllers/producController');

/* GET  */
router.get('/:id', controller.produc)


module.exports = router;