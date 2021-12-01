let db = require('../database/models')
const { Op } = db.Sequelize.Op

module.exports = {
    /* Favoritos */
    addFavorite : (req, res) =>{
        db.User.findOne({
            where: {
                id: +req.session.user.id
            },
            include: [{
                association: "Favorite"
            }]
            })
        .then((user) => {  
            db.Product.findByPk(+req.params.id)    
            .then((product) => {
                db.Favorite.findAll({
                    where: {
                        userId : user.id,
                        productId : product.id
                    }
                }).then((favorite) => {
                    console.log(favorite);
                    if (favorite && favorite.length > 0) {
                        db.Favorite.destroy({
                            where : {
                              userId : user.id,
                              productId : product.id
                            }                    
                        })
                        .then(() => {
                            res.redirect('/')
                            console.log("favorito eliminado");
                        }) 
                    }else{
                        db.Favorite.create({
                            userId : user.id,
                            productId : product.id
                        })
                        .then((favorite) => { 
                            res.redirect('/')                           
                            console.log(favorite);
                        }).catch(errors => console.log(errors)) 
                    }
                })
                
            })
        }).catch(errors => console.log(errors))
  
    },
    deleteFavorite: (req, res) => {
        db.User.findOne({
            where: {
                id: +req.session.user.id
            },
            include: [{
                association: "Favorite"
            }]
        })
        .then((user) => {
            if(user.id == +req.session.user.id) {
                db.Favorite.destroy({
                    where : {
                      userId : user.id,
                      productId : +req.params.id
                    }                    
                })
                .then(() => {
                    res.redirect('/favorites')
                    console.log("favorito eliminado")
                   
                }).catch(errors => console.log(errors)) 
            }
        }).catch(errors => console.log(errors)) 
    },
    deleteAllFavorites: (req, res) => {
        db.User.findByPk(+req.session.user.id)
        .then((user) => {
            db.Favorite.findAll({
                where: {
                    userId: user.id
                }
            }).then((favorites) => {
                favorites.forEach(favorite => {
                    db.Favorite.destroy({
                        where : {
                          id: favorite.id
                        }                    
                    })
                    .then((productsFavorites) => {
                        res.redirect('/favorites')
                        console.log("favorito eliminado");
                    }).catch(errors => console.log(errors)) 
                });
            })           
        }).catch(errors => console.log(errors)) 
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
}