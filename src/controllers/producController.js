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
            association: "Productimages",
            association:"Subcategorie",
            association:"Mark"
          },
        ],
      }).then((products)=>{
        res.render("./products/detalleDelProducto", {
          
          products,
          toThousand,
          
          userInSession : req.session.user ? req.session.user : ''
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