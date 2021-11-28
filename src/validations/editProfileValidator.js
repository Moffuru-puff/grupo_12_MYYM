let { check, body } = require('express-validator');


module.exports = [
    check('user')
        .notEmpty()
        .withMessage("El campo no puede quedar vacio").bail()
        .isAlpha()
        .withMessage("Ingrese solamente caracteres alfabeticos")
        .isLength({ min: 4, max: 8 })
        .withMessage("Ingrese un usuario de min 4 o max 8 caracteres"),

    body("name")
        .custom((value, { req }) => {
            if (value !== "") {
                let regExAlpha = /^[A-Za-z\s]+$/
                if (!regExAlpha.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres alfabeticos"),

    body("lastName")
        .custom((value, { req }) => {
            if (value !== "") {
                let regExAlpha = /^[A-Za-z\s]+$/
                if (!regExAlpha.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres alfabeticos"),

    body("telephone")
        .custom((value, { req }) => {
            if (value !== "") {
                let regExNum = /^[-]?[0-9]+[\.]?[0-9]+$/
                if (!regExNum.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres numericos"),


    /*   check("name")
      .matches('^[A-Za-z\s]+$')
      .withMessage("Ingrese solamente caracteres alfabeticos"), */

    /*     body("name")
        .custom((value, {req}) => {
    
        }) */

    /*    check("lastName")
        .isAlpha('es-ES')
        .withMessage("Ingrese solamente caracteres alfabeticos"),
    
        check("telephone")
        .isNumeric({no_symbols: true})
        .withMessage("ingrese solamente caracteres numericos") */
]