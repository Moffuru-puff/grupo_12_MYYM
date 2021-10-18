const { getProducts, users } = require("../db/dataB");
const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({ include: [{ association: "productimage" }] }).then(
      (Products) => {
        res.render("./products/index.ejs", {
          Products,
          toThousand,
          favorites: req.session.user ? req.session.user.favorites : "",
          userInSession: req.session.user ? req.session.user : "",
          
        });
       // console.log(req.session.user)
      }
    );
    /*       let featured = [];//destacados

      getProducts.forEach(product => {
        if (product.score >= 4){
          featured.push(product)
        }
      });
 */
  },
  search: (req, res) => {
    let result = [];

    getProducts.forEach((product) => {
      if (product.name.toLowerCase().includes(req.query.keywords)) {
        result.push(product);
      }
    });

    res.render("./products/results.ejs", {
      result,
      toThousand,
      search: req.query.keywords,
      favorites: req.session.user ? req.session.user.favorites : "",
      userInSession: req.session.user ? req.session.user : "",
    });
  },
  offers: (req, res) => {
    let withDiscount = []; //con descuento

    getProducts.forEach((product) => {
      if (product.discount >= 5) {
        withDiscount.push(product);
      }
    });

    res.render("./products/offers.ejs", {
      withDiscount,
      toThousand,
      favorites: req.session.user ? req.session.user.favorites : "",
      userInSession: req.session.user ? req.session.user : "",
    });
  },
  retroZone: (req, res) => {
    let retro = [];

    getProducts.forEach((product) => {
      if (product.category == "Zona Retro" || product.subcategory == "retro") {
        retro.push(product);
      }
    });

    res.render("./products/retro.ejs", {
      retro,
      toThousand,
      favorites: req.session.user ? req.session.user.favorites : "",
      userInSession: req.session.user ? req.session.user : "",
    });
  },
  favorite: (req, res) => {
    productsFavorites = [];

    db.Product.findAll(/* {
        include: [{association: "productimage"}]
      } */).then((product) => {
      // getProducts.forEach(product => {
      if (product.id == req.session.user.favorites[product.id]) {
        productsFavorites.push(product);
      }
      res.render("./products/favorites.ejs", {
        productsFavorites,
        toThousand,
        userInSession: req.session.user ? req.session.user : "",
      });
    });
  },
};
