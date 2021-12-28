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
        },
        {
            association: "Valorationproduct",
            include:[{association:'User'}] 
           
        }, 
        { association: "Favorite"}
      ],
    })
      .then((product) => {
        db.Product.findAll({
          where: {
            subcategoryId: product.subcategoryId,
          },
          include: [
            {
              association: "productimage",
            },
          ],
        }).then((products) => {
          res.render("./products/detalleDelProducto", {

            product,
            toThousand,
            sliderTitle: "Productos relacionados",
            sliderProducts: products,


            userInSession: req.session.user ? req.session.user : ''
          })
        })
          .catch(error => console.log(error))

      })
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
                  }).then(() => {

                    return res.redirect('/shoppingCart')
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
  valorationProduct:(req,res)=>{
    let {opinions,rating}= req.body
    
    db.User.findOne({ where:{id:+req.session.user.id}})
    .then(user =>{ 
      db.Product.findOne({
        where:{id:+req.params.id},
        include: [
          {
            association: "productimage"
          },
          {
            association: "Mark"
          },
          {
            association: "Subcategorie"
          },
          {
            association: "Valorationproduct"
          }
        ],
      }).then(product => {
        db.Valorationproduct.create({
          opinions: opinions? opinions : " ",
          score:rating,
          userId: user.id,
          productId:product.id
        }).then(valorationProduct => {
          res.redirect(`/detalleDelProducto/${product.id}`
          
         
           
          )
        })
  

      })
    })
   
  },
 /*  allValorationProduct:(req,res)=>{
    
    
    db.Valorationproduct.findAll({
      where:{
        productId: req.params.id 

      },
      include:[{
        association:'User'
      },
    {association: 'Product'}
    ]
    })
   
   .then(valoration => {
        res.render(`./products/detalleDelProducto/${req.params.id}`,{
          valoration,
          userInSession: req.session.user ? req.session.user : ''
        })
         
           
    })
   
  } */
};
