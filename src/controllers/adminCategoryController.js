const { validationResult } = require("express-validator");
const db = require("../database/models");
const fs = require("fs");
const { Op } = require('sequelize')

module.exports = {
   	/* Categories */
	categoryList: (req, res) => {
		db.Categorie.findAll({
			include: [{ association: "subcategories" }]
		}).then(categories => {
			res.render("./admin/CategoriesList", {
				categories,
				userInSession: req.session.user ? req.session.user : "",
			})
		}).catch(errors => console.log(errors))

	},
	categoryFilters: (req, res) => {
		let { filters } = req.body
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
					break;
			}
			db.Categorie.findAll({
				order: [
					[property, order]
				],
				include: [{ association: "subcategories" }]
			}).then(categories => {
				res.render("./admin/CategoriesList", {
					categories,
					userInSession: req.session.user ? req.session.user : "",
				})
			}).catch(errors => console.log(errors))
		}
	},
	categoryAdminSearch: (req, res) => {		
		let { searchAdmin, keyword } = req.query
		if (searchAdmin) {			

			switch (searchAdmin) {
				case 'id':
				
					db.Categorie.findAll({
						where: {
							id: {
								[Op.like]: `${keyword}%`,
							},
						},
						include: [{ association: "subcategories" }]
					}).then(categories => {
						res.render("./admin/CategoriesList", {
							categories,
							userInSession: req.session.user ? req.session.user : "",
						})
					}).catch(errors => console.log(errors))
					break;
				case 'name':

					db.Categorie.findAll({
						where: {
							name: {
								[Op.like]: `${keyword}%`,
							},
						},
						include: [{ association: "subcategories" }]
					}).then(categories => {
						res.render("./admin/CategoriesList", {
							categories,
							userInSession: req.session.user ? req.session.user : "",
						})
					}).catch(errors => console.log(errors))
					break;
				
				default:
					alert('Error' + req.query);
					break;
			}
		}
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

			db.Categorie.create({
				name
			}).then(() => {
				res.redirect("/admin/categories")
			}).catch(errors => console.log(errors))
		} else {
			res.render("./admin/addCategory", {
				errors: errors.mapped(),
				old: req.body,
				userInSession: req.session.user ? req.session.user : "",
			})
		}
	},

	editCategory: (req, res) => {
		db.Categorie.findByPk(+req.params.id).then((category) => {			
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
			db.Categorie.findByPk(+req.params.id).then((category) => {
				
				res.render("./admin/editCategory", {
					errors: errors.mapped(),
					old: req.body,
					userInSession: req.session.user ? req.session.user : "",
					category,

				})
			}).catch(err => console.log(err))
		}
	},
	categoryDelete: (req, res) => {

		db.Subcategorie.destroy({
			where: {
				categoryId: +req.params.id
			}
		}).then(() => {
			db.Categorie.destroy({
				where: {
					id: +req.params.id
				}
			}).then(() => {
				res.redirect("/admin/categories")
			}).catch(errors => console.log(errors))
		}).catch(errors => console.log(errors))

	},
}