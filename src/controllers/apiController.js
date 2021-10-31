/* const { addUserFavorite, deleteUserFavorite } = require('../db/dataB') */
const db = require('../database/models')
const { Op } = db.Sequelize.Op

const fav = {
    addUserFavorite : (userId, productId) => {
        db.User.findByPk(userId)
        .then((user) => {
            if(user.id == userId) {                
                db.Favorite.create({
                    userId : userId,
                    productId : productId
                })
                .then((user) => {
                    console.log(user);
                }) 
            }
        }).catch(errors => console.log(errors))
    },

     deleteUserFavorite : (userId, productId) => {
        db.User.findByPk(userId)
        .then((user) => {
            if(user.id == userId) {

                db.Favorite.destroy({
                    where : {
                      userId : userId,
                      productId : productId
                    }                    
                })
                .then(() => {
                    console.log("favorito eliminado");
                }) 
            }
        }) 
 
     }
};

module.exports = {
    addFavorite : (req, res) =>{
     user =  fav.addUserFavorite(req.query.userId, req.query.productId)
     req.session.user = user
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {
       user = fav.deleteUserFavorite(req.query.userId, req.query.productId)
       req.session.user = user
        res.send({status: "oki"})
    }
}