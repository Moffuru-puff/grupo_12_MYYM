const { getProducts} = require('../db/dataB')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 
module.exports = {
    index: (req, res) => {
      res.render("index", {
        productos: 
        getProducts,
        toThousand
      });
    },
   
  };