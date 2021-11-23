const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  produc: (req, res) => {

    db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "productimage"
        }, 
        {
          association: "Mark"
        }, 
        {
          association: "Subcategorie"
        }
      ],
    }).then((product) => {
      res.render("./products/detalleDelProducto", {

        product,
        toThousand,

        userInSession: req.session.user ? req.session.user : ''
      })
    })
      .catch(error => console.log(error))

  },
  cart: (req, res) => {
    db.Cart.findAll({
      where: {
        userId: req.session.user.id
      }
    }).then((itemsCart) => {
      itemsCart.forEach(itemCart => {
        console.log(itemCart)
        if(itemCart.itemsId == req.params.id ){
          db.Item.findOne({
            where: {
              id: itemCart.itemsId
            }
          }).then((item) => {
            db.Item.update({
              quantity: quantity++
            },
            {
              where: {
                id: item.id
              }
            }).then(() => {
              res.redirect('/shoppingCart')
            })
          })
        } else {
          db.Product.findOne({
            where: {
              id: req.params.id
            },
            include: [
              {
                association: "productimage"
              }, 
              {
                association: "Mark"
              }, 
              {
                association: "Subcategorie"
              }
            ]
          }).then((product) => {
            db.Item.create({
              productId: product.id,
              price: product.price,
              quantity: 1,
              discount: product.discount ? product.discount : 0,
              name: product.name,
              barcode: product.barcode
            })
            .then((item) => {
              db.Cart.create({
                userId: req.session.user.id,
                itemsId: item.id
              })
              .then(() => {
                res.redirect('/shoppingCart')
              })
            })
            })
        }
      })
    })

    

  },
};