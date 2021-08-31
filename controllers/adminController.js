const { validationResult } = require("express-validator");
const { getProducts, categories, sucursales, users, writeProductsJSON } = require("../db/dataB");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let subcategories = [];
getProducts.forEach((product) => {
  if (!subcategories.includes(product.subcategory)) {
    subcategories.push(product.subcategory);
  }
});

module.exports = {
  index: (req, res) => {
    res.render("./admin/admin");
  },

  productsList: (req, res) => {
    res.render("./admin/productsList", {
      getProducts,
    });
  },

  addProduct: (req, res) => {
    res.render("./admin/cargaDeProductos", {
      categories,
      subcategories,
    });
  },

  charge: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let lastId = 1;

      getProducts.forEach((product) => {
        if (product.id > lastId) {
          lastId = product.id
        }
      })

      console.log(req.body);

      let arrayImages = [];
      if (req.files) {
        req.files.forEach(image => {
          arrayImages.push(image.filename)
        })
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
      } = req.body;

      let newProduct = {
        id: lastId + 1,
        name,
        price,
        discount,
        mark,
        category,
        subcategory,
        scanning,
        stock,
        description,
        image: arrayImages.length > 0 ? arrayImages : ""
      };

      getProducts.push(newProduct);

      writeProductsJSON(getProducts);

      res.redirect("/admin/products");
    } else {
      res.render("./admin/cargaDeProductos", {
        subcategories,
        categories,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  editProduct: (req, res) => {
    let product = getProducts.find(product => product.id === +req.params.id)
    res.render("./admin/editProduct", {
      categories,
      subcategories,
      product
    });
  },
  productUpdate: (req, res) => {

    let arrayImages = [];
    if (req.files) {
      req.files.forEach(image => {
        arrayImages.push(image.filename)
      })
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
    } = req.body;

    console.log(req.body);
    getProducts.map( product => {
      if (product.id === +req.params.id) {
        product.id = product.id,
          product.name = name,
          product.price = price,
          product.discount = discount,
          product.mark = mark,
          product.category = category,
          product.subcategory = subcategory,
          product.scanning = scanning,
          product.stock = stock,
          product.description = description,
          product.image = arrayImages > 0 ? arrayImages : product.image
          console.log("aaa",product);
      }
    })

    writeProductsJSON(getProducts)

    res.redirect("/admin/products")
  },
  productDelete: (req, res) => {
    getProducts.forEach(product => {
      if (product.id === +req.params.id) {
        let productToDestroy = getProducts.indexOf(product);
        getProducts.splice(productToDestroy, 1)
      }
    })

    writeProductsJSON(getProducts)

    res.redirect("/admin/products")
  },

  /* sucursales */
  sucursalList: (req, res) => {
    res.render("./admin/sucursals", {
      sucursales
    });
  },

  addSucursal: (req, res) => {
    res.render("./admin/addSucursal");
  },

  createSucursal: (req, res) => {
    let errors = validationResult(req)

       if (errors.isEmpty()) {
        let lastId = 1;

        sucursales.forEach((sucursal) => {
            if(sucursal.id > lastId){
                lastId = sucursal.id
            }
        })

        let {
            location, 
            direction, 
            telephone, 
            schedule
            } = req.body;

        let newSucursal = {
            id: lastId + 1,
            location,
            direction,
            description,
            telephone,
            schedule
        };

        sucursales.push(newSucursal);

        writeSucursalJSON(sucursales)

        res.redirect('/admin/sucursals')
       } else {
           res.render("./admin/addSucursal", {
               errors: errors.mapped(),
               old: req.body 
           })
       }
  },

  editSucursal: (req, res) => {
    let sucursal = sucursales.find(sucursal => sucursal.id === +req.params.id)
    res.render("./admin/editSucursal", {
      sucursal
    });
  },
  sucursalUpdate: (req, res) => {

   let {
            location, 
            direction, 
            telephone, 
            schedule
            } = req.body;

    console.log(req.body);
    sucursales.map( sucursal => {
      if (sucursal.id === +req.params.id) {
          sucursal.id = sucursal.id,
          sucursal.location = location,
          sucursal.direction = direction,
          sucursal.telephone = telephone,
          sucursal.schedule = schedule
      }
    })

    writeSucursalesJSON(sucursales)

    res.redirect("/admin/sucursals")
  },
  sucursalDelete: (req, res) => {
    sucursales.forEach(sucursal => {
      if (sucursal.id === +req.params.id) {
        let sucursalToDestroy = sucursales.indexOf(sucursal);
        sucursales.splice(sucursalToDestroy, 1)
      }
    })

    writeSucursalesJSON(sucursales)

    res.redirect("/admin/sucursals")
  },

  /* Usuarios */

  userList: (req, res) => {
    res.render("./admin/userList");
  },

  addUser: (req, res) => {
    res.render("./admin/addUser");
  },

  editUser: (req, res) => {
    res.render("./admin/editUser");
  },
};
