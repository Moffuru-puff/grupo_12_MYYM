let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("El campo nombre no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Ingrese más de 3 carácteres")
    
]