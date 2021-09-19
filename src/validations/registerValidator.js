let { check, body } = require('express-validator');
const { getUsers } = require('../db/dataB')

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario").bail()
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

    check('email')
    .notEmpty()
    .withMessage("Debe ingresar su email").bail()
    .isEmail()
    .withMessage("Debe ingresar un email valido"),

    body('email')
    .custom(function(value){

    let usuario = getUsers.filter(user=>{ 
        return user.email == value 
    })
    if(usuario == false){ 
        return true 
    }else{
        return false 
    }
 
}).withMessage('Este email ya está en uso'),
    
    check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña').bail()
    .isLength({min: 4, max: 10})
    .withMessage('Debe ingresar una contraseña de 4-10 caracteres')
  /*   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
    .withMessage('Debe ingresar una contraseña valida') */,
    /* .equals('password', 'repassword') */
    /* .withMessage('Las contraseñas no coinciden'), */

    body('repassword')
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage("Las contraseñas no coinciden"),

    /*check('repassword')
    .notEmpty()
    .withMessage('Debe re-ingresar la contraseña') 
    .equals('password', 'repassword')
    .withMessage('Las contraseñas no coinciden') */
    

]