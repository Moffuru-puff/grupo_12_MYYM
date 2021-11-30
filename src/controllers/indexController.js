const { getProducts, users } = require("../db/dataB");
const db = require("../database/models");
const { Op } = require("sequelize");
const Productsimage = require("../database/models/Productsimage");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    
      let num_page = 1

      let skip_page = (num_page - 1) * 18
  
      db.Product.findAll().then(
        (products) => {
          let num_pages = parseInt((products.length / 18) + 1);        
          db.Product.findAll({
            offset: skip_page,
            limit: 18,
            include: [{
              association: "productimage"
            },
            {
              association: "Favorite"
            },
            ]
          }).then((Products) => {
            res.render("./products/index.ejs", {
              Products,
              toThousand,
              favorites: req.session.user ? req.session.user.favorites : "",
              userInSession: req.session.user ? req.session.user : "",
              num_page: num_page,
              num_pages: num_pages
            })
  
          }).catch(error => console.error(error)) 
        }
      ).catch(error => console.error(error))
  },
  paginationProducts: (req, res) => {
    let num_page = +req.params.num_page

    let skip_page = (num_page - 1) * 18

    db.Product.findAll().then(
      (products) => {
        let num_pages = parseInt((products.length / 18) + 1);        
        db.Product.findAll({
          offset: skip_page,
          limit: 18,
          include: [{
            association: "productimage"
          },
          {
            association: "Favorite"
          },
          ]
        }).then((Products) => {
          res.render("./products/index.ejs", {
            Products,
            toThousand,
            favorites: req.session.user ? req.session.user.favorites : "",
            userInSession: req.session.user ? req.session.user : "",
            num_page: num_page,
            num_pages: num_pages
          })

        }).catch(error => console.error(error)) 
      }
    ).catch(error => console.error(error))
  },
  productsFilters: (req, res) => {
    let { filters } = req.body
    if (filters) {
      let order;
      filters === 'lowerPrice' ? order = 'ASC' : filters === 'higherPrice' ? order = 'DESC' : ""
      if (filters === 'mostRelevant') {
        db.Product.findAll({
          order: [
            ['discount', 'DESC']
          ],
          include: [{ association: "productimage" }, 
          { association: "Favorite"}]
        }).then((Products) => {
          let num_pages = parseInt((Products.length / 18) + 1);
          res.render("./products/index.ejs", {
            Products,
            num_pages,
            toThousand,
            favorites: req.session.user ? req.session.user.favorites : "",
            userInSession: req.session.user ? req.session.user : "",
          });
        }).catch(error => console.log(error))
      } else if (order !== "") {
        db.Product.findAll({
          order: [
            ['price', order]
          ],
          include: [{ association: "productimage" }, 
          { association: "Favorite"}]
        }).then((Products) => {
          let num_pages = parseInt((Products.length / 18) + 1);
          res.render("./products/index.ejs", {
            Products,
            num_pages,
            toThousand,
            favorites: req.session.user ? req.session.user.favorites : "",
            userInSession: req.session.user ? req.session.user : "",
          });
        }).catch(error => console.log(error))
      }

    }
  },
  search: (req, res) => {
    db.Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.keywords}%`,
            },
          },
          {
            mainFeatures: {
              [Op.like]: `%${req.query.keywords}%`,
            },
          },
        ]
      },
      include: [
        {
          association: "Subcategorie",
        },
        {
          association: "productimage",
        },
        { association: "Favorite"}
      ],
    }).then((result) => {
      res.render("./products/results.ejs", {
        result,
        toThousand,
        search: req.query.keywords,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    });
  },
  offers: (req, res) => {
    db.Product.findAll({
      where: {
        discount: {
          [Op.gte]: 5,
        },
      },
      include: [
        {
          association: "Subcategorie",
        },
        {
          association: "productimage",
        },
        { association: "Favorite"}
      ],
    }).then((withDiscount) => {
      res.render("./products/offers.ejs", {
        withDiscount,
        toThousand,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    });
  },
  retroZone: (req, res) => {
    db.Product.findAll({
      include: [{
        association: 'Subcategorie',
        include: [{ association: 'category' }]
      },
      {
        association: "productimage",
      }, 
      { association: "Favorite"}
    ],
      where: {
        [Op.or]: [
          {
            subcategoryId: {
              [Op.eq]: 3,
            }
          },
          {
            name: {
              [Op.like]: `%retro%`,
            }
          }
        ]
      },

    }).then((retro) => {
      res.render("./products/retro.ejs", {
        retro,
        toThousand,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    })
  },
  favorite: async (req, res) => {
    productsFavorites = [];

    await db.Favorite.findAll({
      where: {
        userId: req.session.user.id,
      },
      include: [
        {
          association: "Product",
          include: [{ association: "productimage" }],
        },
      ],
    }).then((favorites) => {
      favorites.forEach((favorite) => {
        productsFavorites.push(favorite.Product);
      });
      res.render("./products/favorites.ejs", {
        productsFavorites,
        toThousand,
        userInSession: req.session.user ? req.session.user : "",
      });
    });
  },

  subcategoriesFilter: (req, res) => {
    db.Product.findAll({
      include: [{
        association: 'Subcategorie',
        include: [{ association: 'category' }]
      },
      {
        association: "productimage",
      }, 
      { association: "Favorite"}],
      where: {
        subcategoryId: +req.params.id
      },

    }).then((result) => {
      let subcategoryName
      result.forEach((product) => {
        product.Subcategorie.id === +req.params.id ? subcategoryName = product.Subcategorie.name : "subcategoría"
      })
      res.render("./products/results.ejs", {
        result,
        search: subcategoryName,
        toThousand,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    })
  },
  marksFilter: (req, res) => {
    db.Product.findAll({
      include: [{
        association: 'Subcategorie',
        include: [{ association: 'category' }]
      },
      {
        association: "productimage",
      },
      {
        association: "Mark"
      }, 
      { association: "Favorite"}],
      where: {
        markId: +req.params.id
      },

    }).then((result) => {
      let markName
      result.forEach((product) => {
        product.Mark.id === +req.params.id ? markName = product.Mark.name : "Marca"
      })
      console.log(result.Subcategorie);
      res.render("./products/results.ejs", {
        result,
        search: markName,
        toThousand,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    })
  },
};
