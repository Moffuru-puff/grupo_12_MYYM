module.exports = {
    shoppingCart: (req, res) => {
      res.render("./products/shoppingCart", {
        userInSession : req.session.user ? req.session.user : ''
      });
    },
    shipping: (req, res) => {
      res.render("./products/shipping", {
        userInSession : req.session.user ? req.session.user : ''
      })
    },
    checkout: (req, res) => {
      res.render("./products/checkout", {
        userInSession : req.session.user ? req.session.user : ''
      })
    },
    confirm: (req, res) => {
      res.render("./products/confirm", {
        userInSession : req.session.user ? req.session.user : ''
      })
    }

  };