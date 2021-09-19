let { check, body } = require('express-validator');

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio").bail()
    .isLength({min: 5, max: 10})
    .withMessage("Ingrese un usuario de 5-10 caracteres")
]