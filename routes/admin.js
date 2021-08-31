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
    chargeSucursal,
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
router.put('/products/edit/:id', productUpdate);
/* Delete Product */
router.delete('/products/delete/:id', productDelete);

/* Sucursales */
router.get('/sucursalList', sucursalList);
router.get('/newSucursal', addSucursal);
router.get('/editSucursal/:id', editSucursal);
//router.get('/deleteSucursal/:id', controller);

/* Usuarios */
router.get('/userList', userList);
router.get('/newUser', addUser);
router.get('/editUser/:id', editUser);
//router.get('/deleteUser/:id', controller); */


module.exports = router;