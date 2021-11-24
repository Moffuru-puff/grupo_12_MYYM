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
      }, 
      include: [
        {
          association: "Item"
        }
      ]
    }).then((itemsCart) => {
      console.log(itemsCart, "itemsCarts es")
      db.Product.findOne({
        where: {
          id: +req.params.id
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
        if (itemsCart.length > 0) {
          itemsCart.forEach(itemCart => {
            console.log(itemCart.Item, "itemCart.item");
            if (itemCart.Item.productId === +req.params.id) {
              console.log(itemCart, "item cart coincidente")
              db.Item.findOne({
                where: {
                  id: itemCart.Item.id
                }
              }).then((item) => {
                db.Item.update({
                  quantity: item.quantity + 1
                },
                  {
                    where: {
                      id: item.id
                    }
                  }).then((a) => {

                    return res.redirect('/shoppingCart')
                    console.log(a, "actualizado");
                  }).catch(error => console.log(error))
              }).catch(error => console.log(error))
            } else if (itemCart.Item.productId !== +req.params.id || !itemCart.id ){
              function cartCreate() {
                return db.Item.create({
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
                       return res.redirect('/shoppingCart')
                      })
                  })
              }
              cartCreate()
            }
          })
        
        } else {
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
        }
      })
    }).catch(error => console.log(error))

  },
};