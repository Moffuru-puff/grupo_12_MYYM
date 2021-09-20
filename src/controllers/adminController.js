const { validationResult } = require("express-validator");
const {
  getProducts,
  categories,
  sucursales,
  users,
  writeProductsJSON,
  writeSucursalesJSON,
  writeUsersJSON,
  getUsers,
} = require("../db/dataB");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let subcategories = [];
getProducts.forEach(product => {
  if (!subcategories.includes(product.subcategory)) {
    subcategories.push(product.subcategory);
  }
});

module.exports = {
  index: (req, res) => {
    res.render("./admin/admin", {
      toThousand,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  productsList: (req, res) => {
    res.render("./admin/productsList", {
      getProducts,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  addProduct: (req, res) => {
    res.render("./admin/cargaDeProductos", {
      categories,
      subcategories,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  charge: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let lastId = 1;

      getProducts.forEach(product => {
        if (product.id >= lastId) {
          lastId = product.id + 1;
        }
      });

      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      const {
        name,
        price,
        discount,
        mark,
        category,
        subcategory,
        scanning,
        stock,
        description,
        mainFeatures,
      } = req.body;

	  let categoria = categories.find(categoria => categoria.id == category);

      let newProduct = {
        id: lastId,
        name,
        price,
        discount,
        mark,
        category: categoria ? categoria.name : category,
        subcategory,
        scanning,
        stock,
        description,
        mainFeatures,
        image: arrayImages.length > 0 ? arrayImages : "",
      };

      getProducts.push(newProduct);

      writeProductsJSON(getProducts);

      res.redirect(`/admin/products/#${newProduct.id}`);
    } else {
      res.render("./admin/cargaDeProductos", {
        subcategories,
        categories,
        errors: errors.mapped(),
        old: req.body,
        userInSession : req.session.user ? req.session.user : ''
      });
    }
  },

  editProduct: (req, res) => {
    let product = getProducts.find(product => product.id === +req.params.id);
    res.render("./admin/editProduct", {
      categories,
      subcategories,
      product,
      userInSession : req.session.user ? req.session.user : ''
    });
  },
  productUpdate: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {

      let arrayImages = [];
      if (req.files) {
        req.files.forEach(image => {
          arrayImages.push(image.filename);
        });
      }

      let {
        name,
        price,
        discount,
        mark,
        category,
        subcategory,
        scanning,
        stock,
        description,
        mainFeatures,
      } = req.body;

      let categoria = categories.find(categoria => categoria.id == category);

      getProducts.map(product => {
        if (product.id === +req.params.id) {
          product.id = product.id,
            product.name = name,
            product.price = price,
            product.discount = discount,
            product.mark = mark,
            product.category = categoria ? categoria.name : category,
            product.subcategory = subcategory,
            product.scanning = scanning,
            product.stock = stock,
            product.description = description,
            product.mainFeatures = mainFeatures,
            product.image =
              arrayImages > 0 ? arrayImages : product.image;
        }
      });

      writeProductsJSON(getProducts);

      res.redirect("/admin/products");
    } else {
      let product = getProducts.find(
        product => product.id === +req.params.id
      );

      res.render("./admin/editProduct", {
        categories,
        subcategories,
        product,
        errors: errors.mapped(),
        old: req.body,
        userInSession : req.session.user ? req.session.user : ''
      });
    }
  },
  productDelete: (req, res) => {
    getProducts.forEach(product => {
      if (product.id === +req.params.id) {
        let productToDestroy = getProducts.indexOf(product);
        getProducts.splice(productToDestroy, 1);
      }
    });

    writeProductsJSON(getProducts);

    res.redirect("/admin/products");
  },

  /* sucursales */
  sucursalList: (req, res) => {
    res.render("./admin/sucursalList", {
      sucursales,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  addSucursal: (req, res) => {
    res.render("./admin/addSucursal", {
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  createSucursal: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let lastId = 1;

      sucursales.forEach(sucursal => {
        if (sucursal.id >= lastId) {
          lastId = sucursal.id + 1;
        }
      });

      let { location, direction, description, telephone, schedule } = req.body;

      let newSucursal = {
        id: lastId,
        location,
        direction,
        description,
        telephone,
        schedule,
      };

      sucursales.push(newSucursal);

      writeSucursalesJSON(sucursales);

      res.redirect("/admin/sucursals");
    } else {
      res.render("./admin/addSucursal", {
        errors: errors.mapped(),
        old: req.body,
        userInSession : req.session.user ? req.session.user : ''
      });
    }
  },

  editSucursal: (req, res) => {
    let sucursal = sucursales.find(
      sucursal => sucursal.id === +req.params.id
    );
    res.render("./admin/editSucursal", {
      sucursal,
      userInSession : req.session.user ? req.session.user : ''
    });
  },
  sucursalUpdate: (req, res) => {
    let { location, direction, telephone, schedule } = req.body;

    sucursales.map(sucursal => {
      if (sucursal.id === +req.params.id) {
        sucursal.id = sucursal.id,
          sucursal.location = location,
          sucursal.direction = direction,
          sucursal.telephone = telephone,
          sucursal.schedule = schedule;
      }
    });

    writeSucursalesJSON(sucursales);

    res.redirect("/admin/sucursals");
  },
  sucursalDelete: (req, res) => {
    sucursales.forEach(sucursal => {
      if (sucursal.id === +req.params.id) {
        let sucursalToDestroy = sucursales.indexOf(sucursal);
        sucursales.splice(sucursalToDestroy, 1);
      }
    });

    writeSucursalesJSON(sucursales);

    res.redirect("/admin/sucursals");
  },

  /* Usuarios */

  userList: (req, res) => {
    res.render("./admin/userList", {
      users,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  addUser: (req, res) => {
    res.render("./admin/addUser", {
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  createUser: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let lastId = 1;

      users.forEach(user => {
        if (user.id >= lastId) {
          lastId = user.id + 1;
        }
      });

      let {
        user,
        name,
        lastname,
        telephone,
        address,
        province,
        email,
        password,
        rol,
      } = req.body;

      let newUser = {
        id: lastId,
        user,
        name,
        lastname,
        telephone,
        address,
        province,
        email,
        password,
        rol,
      };

      users.push(newUser);

      writeUsersJSON(users);

      res.redirect("/admin/userList");
    } else {
      res.render("./admin/addUser", {
        errors: errors.mapped(),
        old: req.body,
        userInSession : req.session.user ? req.session.user : ''

      });
    }
  },

  editUser: (req, res) => {
    let user = users.find(user => user.id === +req.params.id);
    res.render("./admin/editUser", {
      user,
      userInSession : req.session.user ? req.session.user : ''
    });
  },

  userUpdate: (req, res) => {
    let {
      user,
      name,
      lastname,
      telephone,
      address,
      province,
      email,
      password,
      rol,
    } = req.body;

    users.map(usuario => {
      if (usuario.id === +req.params.id) {
        usuario.id = usuario.id,
        usuario.user = user,
        usuario.name = name,
        usuario.lastname = lastname,
        usuario.telephone = telephone,
        usuario.address = address,
        usuario.province = province,
        usuario.email = email,
        usuario.password = password,
        usuario.rol = rol;
      }
    });

    writeUsersJSON(users);

    res.redirect("/admin/userList");
  },

  userDelete: (req, res) => {
    users.forEach(usuario => {
      if (usuario.id === +req.params.id) {
        let userToDestroy = users.indexOf(usuario);
        users.splice(userToDestroy, 1);
      }
    });

    writeUsersJSON(users);

    res.redirect("/admin/userList");
  },
};
