/* const { addUserFavorite, deleteUserFavorite } = require('../db/dataB') */
const db = require('../database/models')
const { Op } = db.Sequelize.Op

const fav = {
    addUserFavorite : (userId, productId) => {
      //  console.log(userId, productId);
        db.User.findByPk(userId)
        .then((user) => {
            if(user.id == userId) {
                //user.Favorite[productId] = productId
                
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
       /*  return dbUser.find(user => {
            
             if (user.id == userId) {
                 user.favorites[productId] = productId
                 
                 saveDB(dbUser, 'users.json')
                 return user
             } 
         }) */
 

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
         /* return dbUser.find(user => {
            
             if (user.id == userId) {
                 delete user.favorites[productId]
                 
                 saveDB(dbUser, 'users.json')
                 return user
             } 
         }) */
 
     }
};

module.exports = {
    addFavorite : (req, res) =>{
       // console.log(req.session.user);
     user =  fav.addUserFavorite(req.query.userId, req.query.productId)
     req.session.user = user
    // console.log(user);
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {
       // console.log(req.session.user);
       user = fav.deleteUserFavorite(req.query.userId, req.query.productId)
       req.session.user = user
      // console.log(user);
        res.send({status: "oki"})
    }
}