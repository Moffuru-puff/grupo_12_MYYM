let { check, body } = require('express-validator');
const { getUsers } = require('../db/dataB')
let db = require("../database/models")

module.exports = [
    
    check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña').bail()
    .isLength({min: 4, max: 10})
    .withMessage('Debe ingresar una contraseña de 4-10 caracteres')
    

]