const { getProducts, users } = require("../db/dataB");
const db = require("../database/models");
const { Op } = require("sequelize");
const Productsimage = require("../database/models/Productsimage");
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
      }
    ).catch(error => console.error(error))
  },
  paginationProducts: (req, res) => {
    let num_page = +req.params.num_page

    let skip_page = (num_page - 1) * 18

    let images = []
    
    db.Product.findAll().then(
      (products) => {
        let num_pages = parseInt((products.length / 18) + 1);
        console.log(num_pages);
        db.Product.findAll({
          offset: skip_page,
          limit: 18,
        }).then((Products) => {
          
          Products.forEach(product => {
            db.Productsimage.findAll({
              where: {
                productId: product.id
              }
            }).then((image) => {
              image.forEach(img => {
                let ProductAndImage = {
                  id: product.id,
                  name: product.name,
                  mainFeatures: product.mainFeatures,
                  price: product.price,
                  discount: product.discount,
                  barcode: product.barcode,
                  stock: product.stock,
                  description: product.description,
                  subcategoryId: product.subcategoryId,
                  markId: product.markId,
                  image: img.dataValues.url
                }
                images = images.concat(ProductAndImage)
                //images.push(ProductAndImage)
                //console.log(img.dataValues, product);
              })
              //images = image[0]
              /* images.push(image[0]) */
              //console.log(images);

            })
          })
          console.log(images);
          res.render("./products/index.ejs", {
            Products,
            images,
            toThousand,
            favorites: req.session.user ? req.session.user.favorites : "",
            userInSession: req.session.user ? req.session.user : "",
            num_page: num_page,
            num_pages: num_pages
          })
          
        }).catch(error => console.error(error))
        //console.log(images);

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
          include: [{ association: "productimage" }]
        }).then((Products) => {
          res.render("./products/index.ejs", {
            Products,
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
          include: [{ association: "productimage" }]
        }).then((Products) => {
          res.render("./products/index.ejs", {
            Products,
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
      }],
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
      }],
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
      }],
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
