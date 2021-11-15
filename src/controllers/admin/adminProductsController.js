const { validationResult } = require("express-validator");
const db = require("../../database/models");
const fs = require("fs");

let categoriesPromise = db.Categorie.findAll();
let subcategoriesPromise = db.Subcategorie.findAll();
let markPromise = db.Mark.findAll();

module.exports = {
    
    productsList: (req, res) => {
        db.Product.findAll({
            include: [
                { association: "Subcategorie", include: [{ association: "category" }] },
            ],
        }).then((getProducts) => {
            res.render("./admin/productsList", {
                getProducts,
                userInSession: req.session.user ? req.session.user : "",
            });
        });
    },

    addProduct: (req, res) => {
        Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
            .then(([categories, subcategories, marks]) => {
                res.render("./admin/cargaDeProductos", {
                    categories,
                    subcategories,
                    marks,
                    userInSession: req.session.user ? req.session.user : "",
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
                categorie,
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
                mainFeatures,
            }).then((product) => {
                if (arrayImages.length > 0) {
                    let images = arrayImages.map((image) => {
                        return {
                            url: image,
                            productId: product.id,
                        };
                    });
                    db.Productsimage.bulkCreate(images)
                        .then(() => res.redirect(`/admin/products`))
                        .catch((err) => console.log(err));
                }
            });
        } else {
            Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
                .then(([categories, subcategories, marks]) => {
                    res.render("./admin/cargaDeProductos", {
                        categories,
                        subcategories,
                        marks,
                        userInSession: req.session.user ? req.session.user : "",
                    });
                })
                .catch((err) => console.log(err));
        }
    },

    editProduct: (req, res) => {
        Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
            .then(([categories, subcategories, marks]) => {
                db.Product.findOne({
                    where: {
                        id: +req.params.id,
                    },
                    include: [
                        {
                            association: "productimage",
                        },
                    ],
                }).then((product) => {
                    res.render("./admin/editProduct", {
                        categories,
                        subcategories,
                        marks,
                        product,
                        userInSession: req.session.user ? req.session.user : "",
                    });
                });
            })
            .catch((err) => console.log(err));
    },
    productUpdate: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }

        if (errors.isEmpty()) {
            let arrayImages = [];
            if (req.files) {
                req.files.forEach((image) => {
                    arrayImages.push(image.filename);
                });
            }

            let {
                name,
                price,
                discount,
                mark,
                categorie,
                subcategorie,
                barcode,
                stock,
                description,
                mainFeatures,
            } = req.body;

            db.Product.update(
                {
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
                { where: { id: req.params.id } }
            )
                .then(() => {
                    if (req.files.length > 0) {
                        var imagesNew = arrayImages.map((image) => {
                            return {
                                url: image,
                                productId: req.params.id,
                            };
                        });
                        db.Productsimage.findAll({
                            where: {
                                productId: req.params.id,
                            },
                        })

                            .then((images) => {
                                images.forEach((image) => {
                                    fs.unlinkSync(`./public/img/Productos Gamers/${image.url}`);
                                });
                                db.Productsimage.destroy({
                                    where: {
                                        productId: req.params.id,
                                    },
                                });
                            })
                            .then(() => {
                                db.Productsimage.bulkCreate(imagesNew);
                            })
                            .then(() => {
                                res.redirect("/admin/products");
                            });
                    }
                    res.redirect("/admin/products");
                })
                .catch((error) => console.log(error));
        } else {
            Promise.all([categoriesPromise, subcategoriesPromise, markPromise])
                .then(([categories, subcategories, marks]) => {
                    db.Product.findByPk(+req.params.id).then((product) => {
                        res.render("./admin/editProduct", {
                            categories,
                            subcategories,
                            marks,
                            product,
                            errors: errors.mapped(),
                            old: req.body,
                            userInSession: req.session.user ? req.session.user : "",
                        });
                    });
                })
                .catch((err) => console.log(err));
        }
    },
    productDelete: (req, res) => {
        db.Productsimage.destroy({
            where: {
                productId: req.params.id,
            },
        })
            .then(() => {
                db.Product.destroy({
                    where: {
                        id: req.params.id,
                    },
                });
            })
            .then(() => {
                res.redirect("/admin/products");
            })
            .catch((error) => console.log(error));
    }
}