const { getProducts} = require('../db/dataB')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    produc: (req, res) => {
      let productID = +req.params.id;

      let product = getProducts.find(product =>
         product.id === productID)
      res.render("./products/detalleDelProducto", {
        productos: 
        getProducts,
        toThousand,
        product,
        userInSession : req.session.user ? req.session.user : ''
      });
    },
  };