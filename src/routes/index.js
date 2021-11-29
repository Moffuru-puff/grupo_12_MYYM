let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController');
let {allFavorites, addFavorite, deleteAllFavorites, deleteFavorite} = require('../controllers/favoritesController');
let cookieCheck = require('../middlewares/cookieCheck')

/* GET  */
router.get('/', cookieCheck, controller.index);
router.post('/', cookieCheck, controller.productsFilters);
router.get('/search', controller.search); 
router.get('/offers', controller.offers); 
router.get('/retro', controller.retroZone); 

router.get('/filteredProducts/:id', controller.subcategoriesFilter); 
router.get('/filteredMarksProducts/:id', controller.marksFilter); 
router.get('/:num_page', controller.paginationProducts); 

/********** Favorites *********/
router.get('/favorites', controller.favorite); 
router.post('/favorites/addOrDelete/:id', addFavorite); 
router.delete('/favorites/deleteOne/:id', deleteFavorite); 
router.delete('/favorites/deleteAll', deleteAllFavorites); 



module.exports = router;