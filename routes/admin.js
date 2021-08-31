let express = require('express');
let router = express.Router();
let {  
    index,
    productsList, 
    addProduct,
    charge,
    editProduct,
    productUpdate,
    productDelete,
    sucursalList, 
    addSucursal,
    createSucursal,
    editSucursal,
    sucursalUpdate,
    sucursalDelete,
    userList,
    addUser,
    editUser
 } = require('../controllers/adminController');
let productUploadImage = require('../middlewares/productUploadImage');
let productValidator = require('../validations/productCreateValidator')


/* GET  */
router.get('/', index);
/* Get - Admin products */
router.get('/products', productsList);
/* Create Product */
router.get('/products/create', addProduct);
router.post('/products/create', productUploadImage.array("image"), productValidator, charge);
/* Edit Product */
router.get('/products/edit/:id', editProduct);
router.put('/products/edit/:id', productUploadImage.array("image"), productValidator, productUpdate);
/* Delete Product */
router.delete('/products/delete/:id', productDelete);

/* Sucursales */
router.get('/sucursals', sucursalList);
/* Create Sucursal */
router.get('/sucursals/create', addSucursal);
router.post('/sucursals/create', productValidator, createSucursal);
/* Edit Sucursal */
router.get('/sucursals/edit/:id', editSucursal);
router.put('/sucursals/edit/:id', productValidator, sucursalUpdate);
/* DeleteSucursal */
router.get('/sucursals/deleteSucursal/:id', sucursalDelete);

/* Usuarios */
router.get('/userList', userList);
router.get('/newUser', addUser);
router.get('/editUser/:id', editUser);
//router.get('/deleteUser/:id', controller); */


module.exports = router;