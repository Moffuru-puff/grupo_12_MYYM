const { check, body } = require('express-validator')
const { getUsers } = require('../db/dataB')
let bcrypt = require('bcryptjs')

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes escribir tu email').bail()
    .isEmail()
    .withMessage('Debes escribir un email válido'),

    body('email')
    .custom(value => {
        let user = getUsers.find(user => user.email === value)

        if(user !== undefined){
            return true
        }else{
            return false
        }
    })
    .withMessage("credenciales invalidas"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('password')
    .custom((value, {req}) => {
        let user = getUsers.find(user => user.email === req.body.email)
        return bcrypt.compareSync(value, user.password)
    })
    .withMessage('credenciales invalidas')
]