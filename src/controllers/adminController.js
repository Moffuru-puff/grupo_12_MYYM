const { validationResult } = require("express-validator");
const {
  //getProducts,
  categories,
  sucursales,
  users,
  writeProductsJSON,
  writeSucursalesJSON,
  writeUsersJSON,
  getUsers,
} = require("../db/dataB");

const db = require('../database/models')
const { Op } = db.Sequelize.Op
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



module.exports = {
  index: (req, res) => {
    res.render("./admin/admin", {
      toThousand,
      userInSession: req.session.user ? req.session.user : ''
    });
  },

  productsList: (req, res) => {
    db.Product.findAll()
      .then(getProducts => {
        res.render("./admin/productsList", {
          getProducts,
          userInSession: req.session.user ? req.session.user : ''
        })
      })
    
  },

  addProduct: (req, res) => {
    let categoriesPromise = db.Categorie.findAll();
    let subcategoriesPromise = db.Subcategorie.findAll();
    let markPromise = db.Mark.findAll();

    Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
      .then(([categories, subcategories, marks]) => {
        res.render("./admin/cargaDeProductos", {
          categories,
          subcategories,
          marks,
          userInSession: req.session.user ? req.session.user : ''
        });
      })
      .catch((err) => console.log(err));

    
  },

  charge: (req, res) => {

    let errors = validationResult(req);
    /*if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }*/

    if (errors.isEmpty()) {
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
        subcategorie,
        barcode,
        stock,
        description,
        mainFeatures,
      } = req.body;

      db.Product.create({
        name,
        price,
        discount,
        markId: mark,
        subcategoryId: subcategorie,
        barcode,
        stock,
        description,
        mainFeatures
       
      })
        .then(product => {
          console.log(product)
          if (arrayImages.length > 0) {
            let images = arrayImages.map(image => {
              return {
                url: image,
                productId: product.id
              }
            })
            db.Productsimage.bulkCreate(images)
              .then(() => res.redirect(`/admin/products`))
              .catch(err => console.log(err))
          }
        })


    } else {
      
      let categoriesPromise = db.Categorie.findAll();
      let subcategoriesPromise = db.Subcategorie.findAll();

      Promise.all([categoriesPromise, subcategoriesPromise])
        .then(([categories, subcategories]) => {
          res.render("./admin/cargaDeProductos", {
            categories,
            subcategories,
            userInSession: req.session.user ? req.session.user : ''
          });
        })
        .catch((err) => console.log(err));
      
    }
  },

  editProduct: (req, res) => {
    let categoriesPromise = db.Categorie.findAll();
    let subcategoriesPromise = db.Subcategorie.findAll();
    let markPromise = db.Mark.findAll();

    Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
      .then(([categories, subcategories, marks]) => {
        db.Product.findByPk(+req.params.id)
          .then(product => {
            res.render("./admin/editProduct", {
              categories,
              subcategories,
              marks,
              product,
              userInSession: req.session.user ? req.session.user : ''

            });
          })})
          .catch((err) => console.log(err));
  
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
      let product = db.Product.findByPk(req.params.id)

      let {
        name,
        price,
        discount,
        mark,
        category,
        subcategorie,
        barcode,
        stock,
        description,
        mainFeatures,
      } = req.body;

      db.Product.update({
        name,
        price,
        discount,
        markId: mark,
        subcategoryId: subcategorie,
        barcode,
        stock,
        description,
        mainFeatures,
       
      },
        { where: { id: req.params.id } })
        .then(() => {
          res.redirect('/admin/products')
        })
        .catch(error => console.log(error))


    } else {
      let categoriesPromise = db.Categorie.findAll();
      let subcategoriesPromise = db.Subcategorie.findAll();
  
      Promise.all([categoriesPromise, subcategoriesPromise])
        .then(([categories, subcategories]) => {
          db.Product.findByPk(+req.params.id)
            .then(product => {
              res.render("./admin/editProduct", {
                categories,
                subcategories,
                product,
                errors: errors.mapped(),
                old: req.body,
                userInSession: req.session.user ? req.session.user : ''
  
              });
            })})
            .catch((err) => console.log(err));
    
    }
  },
  productDelete: (req, res) => {
    db.Productsimage.destroy({
      where: {
        productId: req.params.id 
      }
    }).then(() => {
      db.Product.destroy({
        where: {
          id: req.params.id
        }
      })
    }).then(() => {
      res.redirect("/admin/products")
    }).catch(error => console.log(error))
    
  },

  /* sucursales */
  sucursalList: (req, res) => {
    db.Branchoffice.findAll()
    .then(sucursales => {
      res.render("./admin/sucursalList", {
        sucursales,
        userInSession: req.session.user ? req.session.user : ''
      })
    })
  
  },

  addSucursal: (req, res) => {
     res.render("./admin/addSucursal", {
      userInSession: req.session.user ? req.session.user : ''
    }); 
  },

  createSucursal: (req, res) => {
    let errors = validationResult(req);

     if (errors.isEmpty()) {/*
      let lastId = 1;

      sucursales.forEach(sucursal => {
        if (sucursal.id >= lastId) {
          lastId = sucursal.id + 1;
        }
      }); */

      let { location, direction, description, telephone, schedule } = req.body;

      db.Product.create({
        addressId,
        schedule,
        telephone,
        description
        
      });

      /* sucursales.push(newSucursal);

      writeSucursalesJSON(sucursales); */

      res.redirect("/admin/sucursals");
    } else {
      res.render("./admin/addSucursal", {
        errors: errors.mapped(),
        old: req.body,
        userInSession: req.session.user ? req.session.user : ''
      });
    }
  },

  editSucursal: (req, res) => {
    let sucursal = sucursales.find(
      sucursal => sucursal.id === +req.params.id
    );
    res.render("./admin/editSucursal", {
      sucursal,
      userInSession: req.session.user ? req.session.user : ''
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
      userInSession: req.session.user ? req.session.user : ''
    });
  },

  addUser: (req, res) => {
    res.render("./admin/addUser", {
      userInSession: req.session.user ? req.session.user : ''
    });
  },

  createUser: (req, res) => {
    let errors = validationResult(req);
    /*if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }*/

    if (errors.isEmpty()) {
     
      

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

      db.Product.create({
        addressId,
        shedule,
        telephone,
        description
        })

        .then(product => {
          console.log(product)
          if (arrayImages.length > 0) {
            let images = arrayImages.map(image => {
              return {
                url: image,
                productId: product.id
              }
            })
            db.Productsimage.bulkCreate(images)
              .then(() => res.redirect(`/admin/products`))
              .catch(err => console.log(err))
          }
        })


    } else {
      
            res.render("./admin/cargaDeProductos", {
            categories,
            subcategories,
            userInSession: req.session.user ? req.session.user : ''
          });
        
        
      
    }
  
   /*  let errors = validationResult(req);

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
        userInSession: req.session.user ? req.session.user : ''

      });
    }*/
  }, 

  editUser: (req, res) => {
    let user = users.find(user => user.id === +req.params.id);
    res.render("./admin/editUser", {
      user,
      userInSession: req.session.user ? req.session.user : ''
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
