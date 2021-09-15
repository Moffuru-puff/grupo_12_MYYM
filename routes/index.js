let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController');

let { error } = require('../controllers/indexController')

/* GET  */
router.get('/', controller.index)
router.get('*', error)


module.exports = router;