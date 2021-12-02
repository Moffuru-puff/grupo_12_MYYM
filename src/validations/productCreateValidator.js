let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("El campo nombre no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Ingrese más de 3 carácteres"),

    check('mainFeatures')
    .notEmpty()
    .withMessage("El campo de caracterísicas principales no puede estar vacío")
    .isLength({ min: 4 })
    .withMessage("Ingrese más de 4 carácteres"),

    check('categorie')
    .notEmpty()
    .withMessage("Debes elegir una categoría"),
    
    check('subcategorie')
    .notEmpty()
    .withMessage("Debes elegir una subcategoría"),

    check('price')
    .notEmpty()
    .withMessage("Coloca un precio")
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    check('barcode')
    .notEmpty()
    .withMessage("Debes ingresar el código el producto")
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    check('mark')
    .notEmpty()
    .withMessage("Por favor ingrese la marca del producto")

]