const { getProducts} = require('../db/dataB')

module.exports = {
    produc: (req, res) => {
      let productID = +req.params.id;

      let product = getProducts.find(product =>
         product.id === productID)
      res.render("detalleDelProducto", {
        productos: getProducts,
        product
      });
    },
  };