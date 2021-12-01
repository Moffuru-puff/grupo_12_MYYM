const db = require("../database/models");

module.exports = {
    shoppingCart: (req, res) => {
        db.Cart.findAll({
          where: {
            userId: req.session.user.id
          },
          include: [
            {
              association: "Item",
              include: [
                {
                  association: "Product",
                  include: [
                    {
                      association: "productimage"
                    }
                  ]
                }
              ]
            }
          ]
        }).then(cart =>{
          res.render("./products/shoppingCart", {
            cart,
            userInSession : req.session.user ? req.session.user : '',
            
          }) 
        })
    },
    emptyCart : (req, res) => {
      db.Cart.findAll({
        where: {
          userId: req.session.user.id
        }
      }).then((userProducts) => {
        
        userProducts.forEach(userProduct => {
          db.Cart.destroy(
            {
            where: {
              userId: req.session.user.id
            }
          }).then(() => {
            db.Item.destroy({
              where: {
                id: userProduct.itemsId,
              },
            }).then(() => {
              res.redirect("/shoppingCart");
          })
          
        })
          
        })
          
        
        
      })

        
    },

    deleteProduct: (req, res) => {

      db.Cart.findOne({
        where: {
          id: req.params.id
        }
      }).then((userProduct) => {
        console.log(userProduct)
        db.Cart.destroy({
          where: {
            id: req.params.id
          }
        }).then(() => {
          db.Item.destroy({
            where: {
              id: userProduct.itemsId,
            },
          });
        })
        .then(() => {
          res.redirect("/shoppingCart");
        })
      })

    },


    

    shipping: (req, res) => {
      res.render("./products/shipping", {
        userInSession : req.session.user ? req.session.user : ''

      })
    },
    checkout: (req, res) => {
      res.render("./products/checkout", {
        userInSession : req.session.user ? req.session.user : ''
      })
    },
    confirm: (req, res) => {
      res.render("./products/confirm", {
        userInSession : req.session.user ? req.session.user : ''
      })
    }

  };