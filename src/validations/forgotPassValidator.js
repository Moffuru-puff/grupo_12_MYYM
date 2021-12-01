let { check, body } = require('express-validator');
const { getUsers } = require('../db/dataB')
let db = require("../database/models")

module.exports = [
    check('user')
    .notEmpty()
    .withMessage("Debe ingresar su nombre de usuario").bail()
    .isLength({min: 4, max: 8})
    .withMessage("Ingrese un usuario de min 4 o max 8 caracteres")
    .isAlpha()
    .withMessage("Ingrese solamente caracteres alfabeticos"),

    body('user')
    .custom(value => {
        return db.User.findOne({
            where: {
                user : value
            }
        })
        .then(user => {
            if(user == null){
                return Promise.reject('No encontrado')
            }
        })
        
    }),

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
            if(user == null){
                return Promise.reject('No encontrado')
            }
        })
        
    })

    

]