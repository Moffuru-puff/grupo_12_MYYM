let express = require('express');
let router = express.Router();
let {index, productsFilters, paginationProducts, search, offers, retroZone, subcategoriesFilter, marksFilter, favorite} = require('../controllers/indexController');
let {allFavorites, addFavorite, deleteAllFavorites, deleteFavorite} = require('../controllers/favoritesController');
let cookieCheck = require('../middlewares/cookieCheck')

/* GET  */
router.get('/', cookieCheck, index);
router.post('/', cookieCheck, productsFilters);
router.get('/pagination/:num_page', cookieCheck, paginationProducts); 
router.get('/search', search); 
router.get('/offers', offers); 
router.get('/retro', retroZone); 

router.get('/filteredProducts/:id', subcategoriesFilter); 
router.get('/filteredMarksProducts/:id', marksFilter); 


/********** Favorites *********/
router.get('/favorites', favorite); 
router.post('/favorites/addOrDelete/:id', addFavorite); 
router.delete('/favorites/deleteOne/:id', deleteFavorite); 
router.delete('/favorites/deleteAll', deleteAllFavorites); 



module.exports = router;