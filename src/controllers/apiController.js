const { addUserFavorite } = require('../db/dataB')

module.exports = {
    addFavorite : (req, res) =>{
       console.log(addUserFavorite(req.query.userId, req.query.productId))
       
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {

    }
}