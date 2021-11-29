const { validationResult } = require("express-validator");
const db = require("../database/models");
const fs = require("fs");

module.exports = {
    
    subcategoryList: (req, res) => {
		db.Subcategorie.findAll({
			include: [{
				association: "category"
			}]
		}).then(subcategories => {
			res.render("./admin/SubcategoryList", {
				subcategories,
				userInSession: req.session.user ? req.session.user : "",
			})
		}).catch(errors => console.log(errors))

	},
	subcategoryFilters: (req, res) => {
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
				default:
					console.log(filters);
					break;
			}
			db.Subcategorie.findAll({
				order: [
					[property, order]
				],
				include: [{
					association: "category"
				}]
			}).then(subcategories => {
				res.render("./admin/SubcategoryList", {
					subcategories,
					userInSession: req.session.user ? req.session.user : "",
				})
			}).catch(errors => console.log(errors))
		}
	},
	subcategoryAdd: (req, res) => {
		res.render("./admin/addSubcategory", {
			userInSession: req.session.user ? req.session.user : "",
		})
	},
	createSubcategory: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name, categoryId } = req.body

			db.Subcategorie.create({
				name,
				categoryId
			}).then(() => {
				res.redirect("/admin/subcategories")
			}).catch(errors => console.log(errors))
		} else {
			res.render("./admin/addSubcategory", {
				errors: errors.mapped(),
				old: req.body,
				userInSession: req.session.user ? req.session.user : "",
			})
		}
	},

	editSubcategory: (req, res) => {
		db.Subcategorie.findByPk(+req.params.id).then((subcategory) => {
			console.log(subcategory);
			res.render("./admin/editSubcategory", {
				userInSession: req.session.user ? req.session.user : "",
				subcategory
			})
		}).catch(err => console.log(err))


	},
	subcategoryUpdate: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name, categoryId } = req.body;

			db.Subcategorie.update({
				name,
				categoryId
			}, {
				where: {
					id: +req.params.id
				}
			}).then(() => {
				res.redirect("/admin/subcategories")
			}).catch(errors => console.log(errors))
		} else {
			db.Subcategorie.findByPk(+req.params.id).then((subcategory) => {
				console.log(subcategory);
				res.render("./admin/editSubcategory", {
					errors: errors.mapped(),
					old: req.body,
					userInSession: req.session.user ? req.session.user : "",
					subcategory
				})
			}).catch(err => console.log(err))
		}
	},
	subcategoryDelete: (req, res) => {
		db.Product.findAll({
			where: {
				subcategoryId: +req.params.id
			}
		}).then((productsWithSubcategory) => {
			if (productsWithSubcategory) {
				db.Product.destroy({
					where: {
						subcategoryId: +req.params.id
					}
				}).then((products) => {
					productsWithSubcategory.forEach(product => {
						db.Productsimage.findAll({
							where: {
								productId: product.id,
							},
						}).then((images) => {
							images.forEach((image) => {
								fs.existsSync(`./public/img/Productos Gamers/${image.url}`) ?
									fs.unlinkSync(`./public/img/Productos Gamers/${image.url}`) : console.log("-- No se encontró");
							});
						})
						db.Productsimage.destroy({
							where: {
								productId: product.id,
							},
						}).then(() => { })
					})
					db.Product.destroy({
						where: {
							subcategoryId: +req.params.id,
						},
					}).then((result) => {
						db.Subcategorie.destroy({
							where: {
								id: +req.params.id,
							}
						}).then(() => {
							res.redirect("/admin/subcategories")
						}).catch(errors => console.log(errors))

					}).catch(errors => console.log(errors))
				})
			} else {
				db.Subcategorie.destroy({
					where: {
						id: +req.params.id,
					}
				}).then(() => {
					res.redirect("/admin/subcategories")
				}).catch(errors => console.log(errors))
			}
		})

		db.Product.destroy({
			where: {
				subcategoryId: +req.params.id
			}
		}).then((products) => {
			products.forEach(product => {
				db.Productsimage.findAll({
					where: {
						productId: product.id,
					},
				}).then((images) => {
					images.forEach((image) => {
						fs.existsSync(`./public/img/Productos Gamers/${image.url}`) ?
							fs.unlinkSync(`./public/img/Productos Gamers/${image.url}`) : console.log("-- No se encontró");
					});
				})
				db.Productsimage.destroy({
					where: {
						productId: product.id,
					},
				}).then(() => { })
			})
			db.Product.destroy({
				where: {
					subcategoryId: +req.params.id,
				},
			}).then((result) => {
				db.Subcategorie.destroy({
					where: {
						id: +req.params.id,
					}
				}).then(() => {
					res.redirect("/admin/subcategories")
				}).catch(errors => console.log(errors))

			}).catch(errors => console.log(errors))
		})
	},
}