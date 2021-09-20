let { check, body } = require('express-validator');
const { getUsers } = require('../db/dataB')

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio").bail()
    .isLength({min: 4, max: 7})
    .withMessage("Ingrese un usuario de 4-7 caracteres"),

    body('user')
    .custom(function(value){

    let usuario = getUsers.filter(user=>{ 
        return user.user == value 
    })
    if(usuario == false){ 
        return true 
    }else{
        return false 
    }
 
}).withMessage('Este nombre de usuario ya está en uso'),

    check('name')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio"),

    check('lastname')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio"),

    check('province')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio"),

    check('telephone')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio"),

    check('address')
    .notEmpty()
    .withMessage("El campo no puede quedar vacio")
]