const { getProducts} = require('../db/dataBase')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    produc: (req, res) => {
      let productID = +req.params.id;

      let product = getProducts.find(product =>
         product.id === productID)
      res.render("detalleDelProducto", {
        productos: 
        getProducts,
        toThousand,
        product
      });
    },
  };