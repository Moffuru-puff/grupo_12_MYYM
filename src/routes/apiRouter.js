let express = require('express');
let router = express.Router();
let { addFavorite, deleteFavorite, allCategories, oneCategory, allFavorites } = require('../controllers/api/apiController');
const { allProducts } = require('../controllers/api/apiHomeController');
const { Allprovinces, localidades, prueba } = require('../controllers/api/apiLocalidades');

/* Favorites */
/* router.get('/allfavorites', allFavorites)
router.post('/favorite', addFavorite);
router.delete('/favorite', deleteFavorite); */

/* Categories */
router.get('/categories', allCategories);
router.get('/categories/:id', oneCategory);

/* Localidades */
router.get('/provinces', prueba);
/* router.get('/categories/:id', oneCategory); */

/* Products */
router.get('/products', allProducts)


module.exports = router;