let { check, body } = require('express-validator');

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio")
    .isAlpha('es-ES', {ignore: "\s"})
    .withMessage("Ingrese solamente caracteres alfabeticos")
]