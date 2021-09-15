module.exports = {
    shoppingCart: (req, res) => {
      res.render("./products/shoppingCart");
    },
    shipping: (req, res) => {
      res.render("./products/shipping")
    },
    checkout: (req, res) => {
      res.render("./products/checkout")
    },
    confirm: (req, res) => {
      res.render("./products/confirm")
    }

  };