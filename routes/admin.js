let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');

/* GET  */
router.get('/', controller.index);
router.get('/productsList', controller.productsList);
router.get('/newProduct', controller.charge);
router.get('/editProduct/:id', controller.editProduct);
router.get('/sucursalList', controller.sucursalList);
/*router.get('/deleteProduct/:id', controller);

router.get('/sucursalList', controller);*/
router.get('/newSucursal', controller.addSucursal);
router.get('/editSucursal/:id', controller.editSucursal);
//router.get('/deleteSucursal/:id', controller);

//router.get('/userList', controller);
//router.get('/newUser', controller);
//router.get('/editUser/:id', controller);
//router.get('/deleteUser/:id', controller); */


module.exports = router;