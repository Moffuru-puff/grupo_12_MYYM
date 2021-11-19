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
    userDelete,
    categoryList,
    categoryAdd,
    createCategory,
    editCategory,
    categoryUpdate,
    categoryDelete,
    subcategoryList,
    subcategoryAdd,
    createSubcategory,
    editSubcategory,
    subcategoryUpdate,
    subcategoryDelete,
    markList,
    markAdd,
    createMark,
    editMark,
    markUpdate,
    markDelete,
 } = require('../controllers/adminController');
/* let index = require('../controllers/admin/adminController');
let { productsList, 
    addProduct,
    charge,
    editProduct,
    productUpdate,
    productDelete } = require('../controllers/admin/adminProductsController');

let {
    sucursalList, 
    addSucursal,
    createSucursal,
    editSucursal,
    sucursalUpdate,
    sucursalDelete } = require('../controllers/admin/adminSucursalsController');   

let {
    userList,
    addUser,
    createUser,
    editUser,
    userUpdate,
    userDelete } = require('../controllers/admin/adminUserController'); */

let uploadFile = require('../middlewares/productUploadImage');
let adminCheck = require('../middlewares/adminCheck');
let sucursalValidator = require('../validations/sucursalValidator');
let userAdminValidator = require('../validations/userAdminValidator');
let productValidator = require('../validations/productCreateValidator')


/* GET  */
router.get('/', adminCheck, index);
/* Get - Admin products */
router.get('/products', adminCheck, productsList);
/* Create Product */
router.get('/products/create', adminCheck, addProduct);
router.post('/products/create', uploadFile.array("image"), productValidator, charge);
/* Edit Product */
router.get('/products/edit/:id', adminCheck, editProduct);
router.put('/products/edit/:id', uploadFile.array("image"), productValidator, productUpdate);
/* Delete Product */
router.delete('/products/delete/:id', productDelete);

/* Sucursales */
router.get('/sucursals', adminCheck, sucursalList);
/* Create Sucursal */
router.get('/sucursal/create', adminCheck, addSucursal);
router.post('/sucursal/create', sucursalValidator, createSucursal);
/* Edit Sucursal */
router.get('/sucursals/edit/:id', adminCheck, editSucursal);
router.put('/sucursals/edit/:id', sucursalValidator, sucursalUpdate);
/* Delete Sucursal */
router.delete('/sucursal/deleteSucursal/:id', sucursalDelete);

/* Usuarios */
router.get('/userList', adminCheck, userList);
/* Create User */
router.get('/user/create', adminCheck, addUser);
router.post('/user/create', userAdminValidator, createUser);
/* Edit User */
router.get('/users/edit/:id', adminCheck, editUser);
router.put('/users/edit/:id', userAdminValidator, userUpdate);
/* Delete User */
router.delete('/user/deleteUser/:id', userDelete);

/* Categorías */
router.get('/categories', adminCheck, categoryList);
/* Create category */
router.get('/category/create', adminCheck, categoryAdd);
router.post('/category/create', createCategory);
/* Edit category */
router.get('/category/edit/:id', adminCheck, editCategory);
router.put('/category/edit/:id', categoryUpdate);
/* Delete category */
router.delete('/category/deletecategory/:id', categoryDelete);

/* Subcategorías */
router.get('/subcategories', adminCheck, subcategoryList);
/* Create subcategory */
router.get('/subcategory/create', adminCheck, subcategoryAdd);
router.post('/subcategory/create', createSubcategory);
/* Edit subcategory */
router.get('/subcategory/edit/:id', adminCheck, editSubcategory);
router.put('/subcategory/edit/:id', subcategoryUpdate);
/* Delete subcategory */
router.delete('/subcategory/deletesubcategory/:id', subcategoryDelete);

/* Marcas */
router.get('/marks', adminCheck, markList);
/* Create mark */
router.get('/mark/create', adminCheck, markAdd);
router.post('/mark/create', createMark);
/* Edit mark */
router.get('/mark/edit/:id', adminCheck, editMark);
router.put('/mark/edit/:id', markUpdate);
/* Delete mark */
router.delete('/mark/deletemark/:id', markDelete);

module.exports = router;