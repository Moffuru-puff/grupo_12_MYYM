let db = require('../database/models')
module.exports = (req, res, next) => {
    db.Mark.findAll()
    .then(marks => {
        res.locals.marks = marks
        next()
    })
}