const { getProducts, writeJson } = require('../db/dataBase')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res) => {
      res.render("./admin/admin");
    },

    productsList: (req, res) => {
      res.render("./admin/productsList", {
         productsList: getProducts,
         /* products : function (idProduct) {
            return product
         } */
      });
    },

    addProduct : (req, res) => {
      res.render("./admin/cargaDeProductos", {
        product: getProducts,
      });
    },

    charge : (req, res) => {
      let lastId = 1;

      console.log(req.body);
      getProducts.forEach(product => {
          if(product.id > lastId) {
              lastId = product.id
          }
      })

      const { name,
        price,
        discount,
        mark,
        category,
        subCategory,
        code,
        stock,
        description } = req.body

      let newProduct = {
          id : lastId + 1,
          name,
          price,
          discount,
          mark,
          category,
          subCategory,
          code,
          stock,
          description,
          image: req.file ? req.file.filename : "",
          
      }


      getProducts.push(newProduct);

      writeJson(getProducts)

      res.redirect('/admin/productsList')
    },

    editProduct : (req, res) => {
      res.render("./admin/editProduct");
    },

    /* sucursales */
    sucursalList: (req, res) => {
      res.render("./admin/sucursalList");
    },

    addSucursal : (req, res) => {
      res.render("./admin/addSucursal");
    },

    editSucursal : (req, res) => {
      res.render("./admin/editSucursal");
    },

    /* Usuarios */

    userList: (req, res) => {
      res.render("./admin/userList");
    },

    addUser : (req, res) => {
      res.render("./admin/addUser");
    },

    editUser : (req, res) => {
      res.render("./admin/editUser");
    },
};