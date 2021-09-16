const { addUserFavorite, deleteUserFavorite } = require('../db/dataB')

module.exports = {
    addFavorite : (req, res) =>{
      addUserFavorite(req.query.userId, req.query.productId)
       
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {
        deleteUserFavorite(req.query.userId, req.query.productId)
        res.send({status: "oki"})
    }
}