let express = require('express');
let router = express.Router();
let { addFavorite, deleteFavorite, allCategories, oneCategory, allFavorites } = require('../controllers/api/apiController');
const { allProducts } = require('../controllers/api/apiHomeController');
const { allProvinces, allLocalidades, oneProvinces, oneLocalidades, allMunicipalities , oneMunicipality, allStreets } = require('../controllers/api/apiLocalidades');

/* Favorites */
/* router.get('/allfavorites', allFavorites)
router.post('/favorite', addFavorite);
router.delete('/favorite', deleteFavorite); */

/* Categories */
router.get('/categories', allCategories);
router.get('/categories/:id', oneCategory);

/* Localidades */
router.get('/localities', allLocalidades);
router.get('/localities/:id', oneLocalidades);

/* Provinces */
router.get('/provinces', allProvinces);
router.get('/provinces/:id', oneProvinces);

/* Municipalities */
router.get('/municipalities', allMunicipalities);
router.get('/municipalities/:id', oneMunicipality);

/* Streets */
router.get('/streets', allStreets);

/* Products */
router.get('/products', allProducts)


module.exports = router;