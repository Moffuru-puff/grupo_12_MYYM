const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = db.Sequelize.Op;
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");

let categoriesPromise = db.Categorie.findAll();
let subcategoriesPromise = db.Subcategorie.findAll();
let markPromise = db.Mark.findAll();

module.exports = {
    
    productsList: (req, res) => {
		db.Product.findAll({
			include: [
				{ association: "Subcategorie", include: [{ association: "category" }] },
				{ association: "Mark" }
			],
		}).then((getProducts) => {
			res.render("./admin/productsList", {
				getProducts,
				userInSession: req.session.user ? req.session.user : "",
			});
		});
	},
	productsAdminFilters: (req, res) => {
		let { filters } = req.body
		console.log(filters, req.body);
		if (filters) {
			let order;
			let property;
			switch (filters) {
				case 'idAsc':
					order = 'ASC';
					property = 'id';
					break;
				case 'idDesc':
					order = 'DESC';
					property = 'id';
					break;
				case 'nameAsc':
					order = 'ASC';
					property = 'name';
					break;
				case 'nameDesc':
					order = 'DESC';
					property = 'name';
					break;
				case 'lowerPrice':
					order = 'ASC';
					property = 'price';
					break;
				case 'higherPrice':
					order = 'DESC';
					property = 'price';
					break;
				default:
					console.log(filters);
					break;
			}
			db.Product.findAll({
				order: [
					[property, order]
				],
				include: [
					{ association: "Subcategorie", include: [{ association: "category" }] },
					{ association: "Mark" }
				],
			}).then((getProducts) => {
				res.render("./admin/productsList", {
					getProducts,
					userInSession: req.session.user ? req.session.user : "",
					filters
				});
			}).catch(error => console.log(error))
		}
	},
	productsAdminSearch: (req, res) => {
		let { searchAdmin, keyword } = req.body
		//let keyword = req.query.keyword
		console.log(keyword, req.body);
		if (searchAdmin) {
			let property;
			let value = keyword
			switch (searchAdmin) {
				case 'id':
					property = 'id';
					console.log(keyword, req.body);
					db.Product.findAll({
						where: {
							id: {
								[Op.like]: `%${keyword}%`,
							},
						},
						include: [
							{ association: "Subcategorie", include: [{ association: "category" }] },
							{ association: "Mark" }
						],
					}).then((getProducts) => {
						res.render("./admin/productsList", {
							getProducts,
							userInSession: req.session.user ? req.session.user : ""
						});
					}).catch(error => console.log(error))
					break;
				case 'name':
					property = 'name';
					break;
				case 'barcode':
					property = 'barcode';
					break;
				case 'mark':
					property = 'mark';
					break;
				case 'subcategory':
					property = 'subcategory';
					break;
				default:
					console.log(searchAdmin);
					break;
			}
			if (property !== 'mark' && property !== 'subcategory') {
				console.log(keyword, req.body);
				db.Product.findAll({
					where: {
						property: {
							[Op.like]: `%${value}%`,
						},
					},
					include: [
						{ association: "Subcategorie", include: [{ association: "category" }] },
						{ association: "Mark" }
					],
				}).then((getProducts) => {
					res.render("./admin/productsList", {
						getProducts,
						userInSession: req.session.user ? req.session.user : ""
					});
				}).catch(error => console.log(error))
			} else if (property === 'mark') {
				db.Mark.findAll({
					where: {
						name: {
							[Op.like]: `%${value}%`,
						},
					}
				}).then(marks => {
					console.log(marks);
					db.Product.findAll({
						where: {
							markId: marks.id
						},
						include: [
							{ association: "Subcategorie", include: [{ association: "category" }] },
							{ association: "Mark" }
						],
					}).then((getProducts) => {
						res.render("./admin/productsList", {
							getProducts,
							userInSession: req.session.user ? req.session.user : ""
						});
					}).catch(error => console.log(error))
				})
			} else if (property === 'subcategory') {
				db.Subcategorie.findAll({
					where: {
						name: {
							[Op.like]: `%${value}%`,
						},
					}
				}).then(subcategory => {
					console.log(subcategory);
					db.Product.findAll({
						where: {
							subcategoryId: subcategory.id
						},
						include: [
							{ association: "Subcategorie", include: [{ association: "category" }] },
							{ association: "Mark" }
						],
					}).then((getProducts) => {
						res.render("./admin/productsList", {
							getProducts,
							userInSession: req.session.user ? req.session.user : ""
						});
					}).catch(error => console.log(error))
				})
			} else {
				alert('Error' + req.body)
			}
		}
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
						errors: errors.mapped(),
						old: req.body,
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
						{
							association: "Subcategorie",
						},
					],
				}).then((product) => {
					let subcategoryProduct = product.Subcategorie;
					let categoryProduct = product.Subcategorie.categoryId
					res.render("./admin/editProduct", {
						categoryProduct,
						subcategoryProduct,
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
					db.Product.findOne({
						where: {
							id: +req.params.id,
						},
						include: [
							{
								association: "productimage",
							},
							{
								association: "Subcategorie",
							},
						],
					}).then((product) => {
						let subcategoryProduct = product.Subcategorie;
						let categoryProduct = product.Subcategorie.categoryId
						res.render("./admin/editProduct", {
							categoryProduct,
							subcategoryProduct,
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
	},
}