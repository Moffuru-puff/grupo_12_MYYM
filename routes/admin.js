let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');

/* GET  */
router.get('/', controller.index);
/* router.get('/productsList', controller);
router.get('/newProduct', controller);
router.get('/editProduct/:id', controller);
router.get('/deleteProduct/:id', controller);

router.get('/sucursalList', controller);
router.get('/newSucursal', controller);
router.get('/editSucursal/:id', controller);
router.get('/deleteSucursal/:id', controller);

router.get('/userList', controller);
router.get('/newUser', controller);
router.get('/editUser/:id', controller);
router.get('/deleteUser/:id', controller); */


module.exports = router;