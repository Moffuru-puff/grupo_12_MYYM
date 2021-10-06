let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController');
let cookieCheck = require('../middlewares/cookieCheck')

/* GET  */
router.get('/', cookieCheck, controller.index);
router.get('/search', controller.search); 
router.get('/offers', controller.offers); 
router.get('/retro', controller.retroZone); 
router.get('/favorites', controller.favorite); 



module.exports = router;