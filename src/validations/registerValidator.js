let { check, body } = require('express-validator');
const { getUsers } = require('../db/dataB')
let db = require("../database/models")

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario").bail()
    .isLength({min: 4, max: 8})
    .withMessage("Ingrese un usuario de min 4 o max 8 caracteres"),


    body('user')
    .custom(value => {
        return db.User.findOne({
            where: {
                user : value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject('Este nombre de usuario ya está en uso')
            }
        })
        
    })

/*     body('user')
    .custom(function(value){

    let usuario = getUsers.filter(user=>{ 
        return user.user == value 
    })
    if(usuario == false){ 
        return true 
    }else{
        return false 
    }
 
}).withMessage('Este nombre de usuario ya está en uso') */,

    check('email')
    .notEmpty()
    .withMessage("Debe ingresar su email").bail()
    .isEmail()
    .withMessage("Debe ingresar un email valido"),

    body('email')
    .custom(value => {
        return db.User.findOne({
            where: {
                email : value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject('Este email ya está en uso')
            }
        })
        
    })

/*     body('email')
    .custom(function(value){

    let usuario = getUsers.filter(user=>{ 
        return user.email == value 
    })
    if(usuario == false){ 
        return true 
    }else{
        return false 
    }
 
}).withMessage('Este email ya está en uso') */,
    
    check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña').bail()
    .isLength({min: 4, max: 10})
    .withMessage('Debe ingresar una contraseña de 4-10 caracteres'),

    body('repassword')
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage("Las contraseñas no coinciden"),

    /*check('repassword')
    .notEmpty()
    .withMessage('Debe re-ingresar la contraseña') 
    .equals('password', 'repassword')
    .withMessage('Las contraseñas no coinciden') */
    

]