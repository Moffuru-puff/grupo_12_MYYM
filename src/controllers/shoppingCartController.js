const db = require("../database/models");

module.exports = {
    shoppingCart: (req, res) => {
        db.Cart.findAll({
          where: {
            userId: req.session.user.id
          },
          include: [
            {
              association: "Item"
            }
          ]
        }).then(cart =>{
          res.render("./products/shoppingCart", {
            cart,
            userInSession : req.session.user ? req.session.user : '',
            
          }) 
        })
    },
/*       db.Cart.findAll({
        include: [
          {
            association: "Item"
          }
        ]
      }).then(cart =>{
        res.render("./products/shoppingCart", {
          cart,
          userInSession : req.session.user ? req.session.user : '',
          
        }) 
      }) */




    

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