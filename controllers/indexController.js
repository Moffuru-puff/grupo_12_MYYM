const { getProducts} = require('../db/dataBase')
 
module.exports = {
    index: (req, res) => {
      res.render("index", {
        productos: getProducts
      });
    },
  };