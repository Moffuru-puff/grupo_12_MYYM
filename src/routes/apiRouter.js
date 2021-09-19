let express = require('express');
let router = express.Router();
let { addFavorite, deleteFavorite } = require('../controllers/apiController');

router.post('/favorite', addFavorite);
router.delete('/favorite', deleteFavorite);


module.exports = router;