module.exports = {
    index: (req, res) => {
      res.render("./admin/admin");
    },

    productsList: (req, res) => {
      res.render("./admin/productsList");
    },

    charge : (req, res) => {
      res.render("./admin/cargaDeProductos");
    },

    editProduct : (req, res) => {
      res.render("./admin/editProduct");
    },
};