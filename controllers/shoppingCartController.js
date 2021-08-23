module.exports = {
    shoppingCart: (req, res) => {
      res.render("shoppingCart");
    },
    shipping: (req, res) => {
      res.render("shipping")
    },
    checkout: (req, res) => {
      res.render("checkout")
    },
    confirm: (req, res) => {
      res.render("confirm")
    }

  };