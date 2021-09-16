module.exports = {
    shoppingCart: (req, res) => {
      res.render("./products/shoppingCart", {
        user : req.session.user ? req.session.user : ''
      });
    },
    shipping: (req, res) => {
      res.render("./products/shipping", {
        user : req.session.user ? req.session.user : ''
      })
    },
    checkout: (req, res) => {
      res.render("./products/checkout", {
        user : req.session.user ? req.session.user : ''
      })
    },
    confirm: (req, res) => {
      res.render("./products/confirm", {
        user : req.session.user ? req.session.user : ''
      })
    }

  };