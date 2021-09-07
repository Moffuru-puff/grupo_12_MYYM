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
    createUser,
    editUser,
    userUpdate,
    userDelete
 } = require('../controllers/adminController');
let uploadFile = require('../middlewares/productUploadImage');
let productValidator = require('../validations/productCreateValidator')


/* GET  */
router.get('/', index);
/* Get - Admin products */
router.get('/products', productsList);
/* Create Product */
router.get('/products/create', addProduct);
router.post('/products/create', uploadFile.array("image"), productValidator, charge);
/* Edit Product */
router.get('/products/edit/:id', editProduct);
router.put('/products/edit/:id', uploadFile.array("image"), productValidator, productUpdate);
/* Delete Product */
router.delete('/products/delete/:id', productDelete);

/* Sucursales */
router.get('/sucursals', sucursalList);
/* Create Sucursal */
router.get('/sucursal/create', addSucursal);
router.post('/sucursal/create', createSucursal);
/* Edit Sucursal */
router.get('/sucursals/edit/:id', editSucursal);
router.put('/sucursals/edit/:id', productValidator, sucursalUpdate);
/* Delete Sucursal */
router.delete('/sucursal/deleteSucursal/:id', sucursalDelete);

/* Usuarios */
router.get('/userList', userList);
/* Create User */
router.get('/user/create', addUser);
router.post('/user/create', createUser);
/* Edit User */
router.get('/users/edit/:id', editUser);
router.put('/users/edit/:id', productValidator, userUpdate);
/* Delete User */
router.delete('/user/deleteUser/:id', userDelete);

/* router.get('/newUser', addUser);
router.get('/editUser/:id', editUser); */



module.exports = router;