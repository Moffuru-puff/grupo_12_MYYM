const { getProducts} = require('../db/dataB')
 
module.exports = {
    index: (req, res) => {
      res.render("index", {
        productos: getProducts
      });
    },
  };