let { check, body } = require('express-validator');

module.exports = [
    check('name')
    .isAlpha('es-ES', {ignore: "\s"})
    .withMessage("Ingrese solamente caracteres alfabeticos"),

]