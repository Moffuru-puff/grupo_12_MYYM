let db = require('../database/models')
module.exports = (req, res, next) => {
    db.Categorie.findAll({
        include: [{
            association: "subcategories"
        }]
    })
    .then(categories => {
        res.locals.categories = categories
        next()
    })
}