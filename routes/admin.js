let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');
let productUploadImage = require('../middlewares/productUploadImage')


/* GET  */
router.get('/', controller.index);
router.get('/productsList', controller.productsList);
router.get('/newProduct', controller.addProduct);
router.post('/chargeProduct', /* productUploadImage.single("image"), */ controller.charge);
router.get('/editProduct/:id', controller.editProduct);
//router.get('/deleteProduct/:id', controller);

/* Sucursales */
router.get('/sucursalList', controller.sucursalList);
router.get('/newSucursal', controller.addSucursal);
router.get('/editSucursal/:id', controller.editSucursal);
//router.get('/deleteSucursal/:id', controller);

/* Usuarios */
router.get('/userList', controller.userList);
router.get('/newUser', controller.addUser);
router.get('/editUser/:id', controller.editUser);
//router.get('/deleteUser/:id', controller); */


module.exports = router;