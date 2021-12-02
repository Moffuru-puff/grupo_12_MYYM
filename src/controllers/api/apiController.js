let db = require('../../database/models')
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
    /* Favoritos */
    addFavorite : (req, res) =>{
     user =  fav.addUserFavorite(req.query.userId, req.query.productId)
     req.session.user = user;
     req.locals.user = user;
       res.send({status: "ok"})
    },
    deleteFavorite: (req, res) => {
       user = fav.deleteUserFavorite(req.query.userId, req.query.productId)
       req.session.user = user;
       req.locals.user = user;
        res.send({status: "oki"})
    },
    allFavorites: (req, res) => {
        db.Favorite.findAll({
            where: {
                userId: +req.session.user.id
            },
            include: [{
                association: "Product"
            }]
        }).then((favorites) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: favorites.length
                },
                data: favorites
            })
        })
    },
    
    /* Categorías */
    allCategories: (req, res)=>{
        db.Categorie.findAll({
            include: [{association: "subcategories"}]
        })
        .then(categories => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: categories.length
                },
                data: categories
            })
        })
    },
    oneCategory: (req, res) => {
        db.Categorie.findOne({where: {id: +req.params.id }, include: [{association: "subcategories"}]}).then(category => {
            res.status(200).json({
                meta:{
                    status: 200
                },
                data: category
            })
        })
    }
}