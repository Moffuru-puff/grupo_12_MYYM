let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController');

/* GET  */
router.get('/', controller.index);
router.get('/search', controller.search); 
router.get('/offers', controller.offers); 
router.get('/retro', controller.retroZone); 



module.exports = router;