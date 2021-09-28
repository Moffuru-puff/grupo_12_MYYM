const { addUserFavorite, deleteUserFavorite } = require('../db/dataB')

module.exports = {
    addFavorite : (req, res) =>{
        console.log(req.session.user);
     user =  addUserFavorite(req.query.userId, req.query.productId)
     req.session.user = user
     console.log(user);
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {
        console.log(req.session.user);
       user = deleteUserFavorite(req.query.userId, req.query.productId)
       req.session.user = user
       console.log(user);
        res.send({status: "oki"})
    }
}