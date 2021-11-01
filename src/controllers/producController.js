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
};