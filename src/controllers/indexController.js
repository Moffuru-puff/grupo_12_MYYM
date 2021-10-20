const { getProducts, users } = require("../db/dataB");
const db = require("../database/models");
const { Op } = require("sequelize");
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
    );
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
      where: {
        [Op.or]: [
          {
            subcategoryId: {
              [Op.eq]: 3,
            },
          },
          {
            name: {
              [Op.like]: `%retro%`,
            },
          },
        ],
      },
      include: [{ association : 'Subcategorie', 
      include: [{ association : 'category'}] },
      {
        association: "productimage",
      },]
    }).then((retro) => {
      res.render("./products/retro.ejs", {
        retro,
        toThousand,
        favorites: req.session.user ? req.session.user.favorites : "",
        userInSession: req.session.user ? req.session.user : "",
      });
    })   
  },
  favorite: (req, res) => {
    productsFavorites = [];
    console.log(req.session.user);

    db.Favorite.findAll({
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
};
