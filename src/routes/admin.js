let express = require('express');
let router = express.Router();

let { index } = require('../controllers/adminController');
let { productsList, 
    productsAdminFilters,
    productsAdminSearch,
    addProduct,
    charge,
    editProduct,
    productUpdate,
    productDelete, } = require('../controllers/adminProductsController');

let {
    sucursalList, 
    sucursalFilters,
    addSucursal,
    createSucursal,
    editSucursal,
    sucursalUpdate,
    sucursalDelete, } = require('../controllers/adminSucursalsController');   

let {
    userList,
    usersAdminFilters,
    addUser,
    createUser,
    editUser,
    userUpdate,
    userDelete } = require('../controllers/adminUserController');

let {
     categoryList,
    categoryFilters,
    categoryAdd,
    createCategory,
    editCategory,
    categoryUpdate,
    categoryDelete, } = require('../controllers/adminCategoryController');

let {
    subcategoryList,
    subcategoryFilters,
    subcategoryAdd,
    createSubcategory,
    editSubcategory,
    subcategoryUpdate,
    subcategoryDelete, } = require('../controllers/adminSubcategoryController');

let {
    markList,
    marksFilters,
    markAdd,
    createMark,
    editMark,
    markUpdate,
    markDelete } = require('../controllers/adminMarksController');



let uploadFile = require('../middlewares/productUploadImage');
let adminCheck = require('../middlewares/adminCheck');
let sucursalValidator = require('../validations/sucursalValidator');
let userAdminValidator = require('../validations/userAdminValidator');
let productValidator = require('../validations/productCreateValidator')
let categoryValidator = require('../validations/categoryValidator')
let subcategoryValidator = require('../validations/subcategoryValidator')
let marksValidator = require('../validations/marksValidator')


/* GET  */
router.get('/', adminCheck, index);
/* Get - Admin products */
router.get('/products', adminCheck, productsList);
router.post('/products', adminCheck, productsAdminFilters);
router.post('/productsSearch', adminCheck, productsAdminSearch);
/* Create Product */
router.get('/products/create', adminCheck, addProduct);
router.post('/products/create', uploadFile.array("image"), productValidator, charge);
/* Edit Product */
router.get('/products/edit/:id', adminCheck, editProduct);
router.put('/products/edit/:id', uploadFile.array("image"), productValidator, productUpdate);
/* Delete Product */
router.delete('/products/delete/:id', productDelete);

/********* Sucursales ********/
router.get('/sucursals', adminCheck, sucursalList);
router.post('/sucursals', adminCheck, sucursalFilters);
/* Create Sucursal */
router.get('/sucursal/create', adminCheck, addSucursal);
router.post('/sucursal/create', sucursalValidator, createSucursal);
/* Edit Sucursal */
router.get('/sucursals/edit/:id', adminCheck, editSucursal);
router.put('/sucursals/edit/:id', sucursalValidator, sucursalUpdate);
/* Delete Sucursal */
router.delete('/sucursal/deleteSucursal/:id', sucursalDelete);

/************ Usuarios **********/
router.get('/userList', adminCheck, userList);
router.post('/userList', adminCheck, usersAdminFilters);
/* Create User */
router.get('/user/create', adminCheck, addUser);
router.post('/user/create', userAdminValidator, createUser);
/* Edit User */
router.get('/users/edit/:id', adminCheck, editUser);
router.put('/users/edit/:id', userAdminValidator, userUpdate);
/* Delete User */
router.delete('/user/deleteUser/:id', userDelete);

/********* Categorías **********/
router.get('/categories', adminCheck, categoryList);
router.post('/categories', adminCheck, categoryFilters);
/* Create category */
router.get('/category/create', adminCheck, categoryAdd);
router.post('/category/create', categoryValidator, createCategory);
/* Edit category */
router.get('/category/edit/:id', adminCheck, editCategory);
router.put('/category/edit/:id', categoryValidator, categoryUpdate);
/* Delete category */
router.delete('/category/deletecategory/:id', categoryDelete);

/************ Subcategorías ************/
router.get('/subcategories', adminCheck, subcategoryList);
router.post('/subcategories', adminCheck, subcategoryFilters);
/* Create subcategory */
router.get('/subcategory/create', adminCheck, subcategoryAdd);
router.post('/subcategory/create', subcategoryValidator, createSubcategory);
/* Edit subcategory */
router.get('/subcategory/edit/:id', adminCheck, editSubcategory);
router.put('/subcategory/edit/:id', subcategoryValidator, subcategoryUpdate);
/* Delete subcategory */
router.delete('/subcategory/deletesubcategory/:id', subcategoryDelete);

/********* Marcas ********/
router.get('/marks', adminCheck, markList);
router.post('/marks', adminCheck, marksFilters);
/* Create mark */
router.get('/mark/create', adminCheck, markAdd);
router.post('/mark/create', marksValidator, createMark);
/* Edit mark */
router.get('/mark/edit/:id', adminCheck, editMark);
router.put('/mark/edit/:id', marksValidator, markUpdate);
/* Delete mark */
router.delete('/mark/deletemark/:id', markDelete);

module.exports = router;