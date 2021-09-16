let { check } = require('express-validator');

module.exports = [
    check('location')
    .notEmpty()
    .withMessage("El campo localidad no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Ingrese más de 3 carácteres"),

    check('direction')
    .notEmpty()
    .withMessage("El campo dirección no puede estar vacío")
    .isLength({ min: 5 })
    .withMessage("Ingrese más de 5 carácteres"),

    check('telephone')    
    .notEmpty().bail()
    .withMessage("El campo teléfono no puede estar vacío")
    .isInt()
    .withMessage("Debes ingresar un teléfono válido"),
    
]