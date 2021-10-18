//const { getProducts} = require('../db/dataB')
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
     /*  res.send(product) */
      res.render("./products/detalleDelProducto", {

        product,
        toThousand,

        userInSession: req.session.user ? req.session.user : ''
      })
    })
      .catch(error => console.log(error))


    /* let productID = +req.params.id;

    let product = getProducts.find(product =>
       product.id === productID)
    res.render("./products/detalleDelProducto", {
      productos: 
      getProducts,
      toThousand,
      product,
      userInSession : req.session.user ? req.session.user : ''
    }); */
  },
};