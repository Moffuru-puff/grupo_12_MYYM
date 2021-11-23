let express = require('express');
let router = express.Router();
let { addFavorite, deleteFavorite, allCategories, oneCategory } = require('../controllers/api/apiController');

/* Favorites */
router.post('/favorite', addFavorite);
router.delete('/favorite', deleteFavorite);

/* Categories */
router.get('/categories', allCategories);
router.get('/categories/:id', oneCategory);


module.exports = router;