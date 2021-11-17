const { validationResult } = require("express-validator");
let bcrypt = require('bcryptjs')

const db = require("../database/models");
const { Op } = db.Sequelize.Op;
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");

let categoriesPromise = db.Categorie.findAll();
let subcategoriesPromise = db.Subcategorie.findAll();
let markPromise = db.Mark.findAll();

module.exports = {
	index: (req, res) => {
		res.render("./admin/admin", {
			//toThousand,
			userInSession: req.session.user ? req.session.user : "",
		});
	},

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
	},

	/* sucursales */
	sucursalList: (req, res) => {
		db.Branchoffice.findAll({
			include: [{ association: "Address" }],
		}).then((sucursales) => {
			res.render("./admin/sucursalList", {
				sucursales,
				userInSession: req.session.user ? req.session.user : "",
			});
		});
	},

	addSucursal: (req, res) => {
		res.render("./admin/addSucursal", {
			userInSession: req.session.user ? req.session.user : "",
		});
	},

	createSucursal: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { location, direction, telephone, schedule, postalCode } = req.body;

			db.Addresse.create({
				address: direction,
				state: location,
				postalCode: postalCode,
			}).then((address) => {
				db.Branchoffice.create({
					addressId: address.id,
					schedule,
					telephone,
				}).then(() => { res.redirect("/admin/sucursals") });
				res.redirect("/admin/sucursals");
			});
		} else {
			res.render("./admin/addSucursal", {
				errors: errors.mapped(),
				old: req.body,
				userInSession: req.session.user ? req.session.user : "",
			});
		}
	},

	editSucursal: (req, res) => {
		let = db.Branchoffice.findOne({
			where: {
				id: +req.params.id,
			},
			include: [
				{
					association: "Address",
				},
			],
		}).then((sucursal) => {
			res.render("./admin/editSucursal", {
				sucursal,
				userInSession: req.session.user ? req.session.user : "",
			});
		});
	},

	sucursalUpdate: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { location, direction, telephone, schedule, postalCode } = req.body;

			let $office = db.Branchoffice.findByPk(+req.params.id)
				.then((office) => {
					let $addressId = office.addressId;
					db.Branchoffice.update(
						{
							schedule,
							telephone,
						},
						{
							where: {
								id: +req.params.id,
							},
						}
					).then(() => {
						db.Addresse.update(
							{
								address: direction,
								state: location,
								postalCode: postalCode,
							},
							{
								where: {
									id: $addressId,
								},
							}
						).then((address) => {
							res.redirect("/admin/sucursals");
						}).catch((error) => console.log(error, 'error address'));
					}).catch((error) => console.log(error));

				})

		} else {
			let = db.Branchoffice.findOne({
				where: {
					id: +req.params.id,
				},
				include: [
					{
						association: "Address",
					},
				],
			}).then((sucursal) => {
				res.render("./admin/editSucursal", {
					sucursal,
					errors: errors.mapped(),
					old: req.body,
					userInSession: req.session.user ? req.session.user : "",
				});
			});
		}
	},
	sucursalDelete: (req, res) => {
		let $office = db.Branchoffice.findByPk(+req.params.id)
			.then((office) => {
				let $addressId = office.addressId;

				db.Branchoffice.destroy({
					where: {
						id: +req.params.id,
					}
				}).then(() => {
					db.Addresse.destroy({
						where: {
							id: $addressId
						},
					}).then(() => {
						res.redirect("/admin/sucursals");
					})
				}).catch((error) => console.log(error));


			})
			.catch((error) => console.log(error));
	},

	/* Usuarios */

	userList: (req, res) => {
		db.User.findAll({
			include: [{
				association: "Addresse"
			},
			{
				association: "Role"
			}]
		}).then((users) => {
			res.render("./admin/userList", {
				users,
				userInSession: req.session.user ? req.session.user : "",
			});
		}).catch((error) => console.log(error))
	},

	addUser: (req, res) => {
		res.render("./admin/addUser", {
			userInSession: req.session.user ? req.session.user : "",
		});
	},

	createUser: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let {
				user,
				name,
				lastname,
				telephone,
				address,
				province,
				country,
				email,
				password,
				rol,
				postalCode
			} = req.body;

			db.Addresse.create({
				address,
				city: province,
				country,
				postalCode
			}).then(address => {
				db.User.create({
					user,
					name,
					lastName: lastname,
					email,
					password: bcrypt.hashSync(password, 12),
					rolesId: rol,
					addressesId: address.id,
					telephone,
					avatar: "defaultAvatarImage.png"
				}).then(() => {
					res.redirect('/admin/userList')
				})
			}).catch((err) => console.log(err));
		} else {
			res.render("./admin/addUser", {
				userInSession: req.session.user ? req.session.user : "",
			});
		}
	},

	editUser: (req, res) => {

		db.User.findOne({
			where: {
				id: +req.params.id,
			},
			include: [
				{
					association: "Addresse",
				},
				{
					association: "Role"
				}
			],
			/* include: [
				{
					association: "Role"
				}
			], */
		}).then(user => {
			res.render("./admin/editUser", {
				user,
				userInSession: req.session.user ? req.session.user : "",
			});
		})
	},

	userUpdate: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let {
				user,
				name,
				lastname,
				telephone,
				address,
				province,
				country,
				email,
				rol,
				postalCode
			} = req.body;

			db.User.findByPk(+req.params.id).then(usuario => {
				db.Addresse.update({
					address,
					city: province,
					country,
					postalCode
				}, {
					where: {
						id: usuario.addressesId
					}
				}).then(() => {
					db.User.update({
						user,
						name,
						lastName: lastname,
						email,
						rolesId: rol,
						telephone
					}, {
						where: {
							id: usuario.id
						}
					}).then(() => {
						res.redirect('/admin/userList')
					}).catch((err) => console.log(err))
				})
			});
		} else {
			res.render("./admin/editUser", {
				userInSession: req.session.user ? req.session.user : "",
			});
		}
	},

	userDelete: (req, res) => {
		db.User.findByPk(+req.params.id)
			.then((user) => {
				let $addressesId = user.addressesId;

				db.User.destroy({
					where: {
						id: +req.params.id,
					}
				}).then(() => {
					db.Addresse.destroy({
						where: {
							id: $addressesId
						},
					}).then(() => {
						res.redirect("/admin/userList");
					})
				}).catch((error) => console.log(error));
			}).catch((error) => console.log(error));
	},

	/* Categories */

	categoryList: (req, res) => {
		db.Categorie.findAll().then(categories => {
			res.render("./admin/CategoriesList", {
				categories,
				userInSession: req.session.user ? req.session.user : "",
			})
		}).catch(errors => console.log(errors))

	},
	categoryAdd: (req, res) => {
		res.render("./admin/addCategory", {
			userInSession: req.session.user ? req.session.user : "",
		})
	},
	createCategory: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name } = req.body
			console.log(name);
			db.Categorie.create({
				name
			}).then(() => {
				res.redirect("/admin/categories", {
					userInSession: req.session.user ? req.session.user : "",
				})
			}).catch(errors => console.log(errors))
		} else {
			res.redirect("/category/create", {
				userInSession: req.session.user ? req.session.user : "",
			})
		}
	},

	editCategory: (req, res) => {
		db.Categorie.findByPk(+req.params.id).then((category) => {
			console.log(category);
			res.render("./admin/editCategory", {
				userInSession: req.session.user ? req.session.user : "",
				category,
				
			})
		}).catch(err => console.log(err))


	},
	categoryUpdate: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name } = req.body;

			db.Categorie.update({
				name
			}, {
				where: {
					id: +req.params.id
				}
			}).then(() => {
				res.redirect("/admin/categories")
			}).catch(errors => console.log(errors))
		} else {
			res.redirect("/category/edit/:id")
		}
	},
	categoryDelete: (req, res) => {

		db.Categorie.destroy({
			where: {
				id: +req.params.id
			}
		}).then(() => {
			res.redirect("/admin/categories")
		}).catch(errors => console.log(errors))
	}
};
