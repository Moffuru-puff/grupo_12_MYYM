module.exports = {
    index: (req, res) => {
      res.render("./products/btnDeArrepentimiento.ejs", {
        userInSession : req.session.user ? req.session.user : ''
      });
    },
};