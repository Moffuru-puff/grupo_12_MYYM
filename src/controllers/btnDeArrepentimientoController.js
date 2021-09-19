module.exports = {
    index: (req, res) => {
      res.render("./products/btnDeArrepentimiento.ejs", {
        user : req.session.user ? req.session.user : ''
      });
    },
};