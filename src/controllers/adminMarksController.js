const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require('sequelize')

module.exports = {    
    /* Marcas */
	markList: (req, res) => {
		db.Mark.findAll().then(marks => {
			res.render("./admin/MarksList", {
				marks,
				userInSession: req.session.user ? req.session.user : "",
			})
		}).catch(errors => console.log(errors))

	},
	marksFilters: (req, res) => {
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
				db.Mark.findAll({
					order: [
						[property, order]
					]
				}).then(marks => {
					res.render("./admin/MarksList", {
						marks,
						userInSession: req.session.user ? req.session.user : "",
					})
				}).catch(errors => console.log(errors))
		}
	},
	marksAdminSearch: (req, res) => {		
		let { searchAdmin, keyword } = req.query
		if (searchAdmin) {			

			switch (searchAdmin) {
				case 'id':
				
					db.Mark.findAll({
						where: {
							id: {
								[Op.like]: `${keyword}%`,
							},
						}
					}).then(marks => {
						res.render("./admin/MarksList", {
							marks,
							userInSession: req.session.user ? req.session.user : "",
						})
					}).catch(errors => console.log(errors))

					break;
				case 'name':
					
					db.Mark.findAll({
						where: {
							name: {
								[Op.like]: `${keyword}%`,
							},
						}
					}).then(marks => {
						res.render("./admin/MarksList", {
							marks,
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
	markAdd: (req, res) => {
		res.render("./admin/addMark", {
			userInSession: req.session.user ? req.session.user : "",
		})
	},
	createMark: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name } = req.body

			db.Mark.create({
				name
			}).then(() => {
				res.redirect("/admin/marks")
			}).catch(errors => console.log(errors))
		} else {
			res.render("./admin/addMark", {
				errors: errors.mapped(),
				old: req.body,
				userInSession: req.session.user ? req.session.user : "",
			})
		}
	},

	editMark: (req, res) => {
		db.Mark.findByPk(+req.params.id).then((mark) => {
			res.render("./admin/editMark", {
				userInSession: req.session.user ? req.session.user : "",
				mark,

			})
		}).catch(err => console.log(err))


	},
	markUpdate: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let { name } = req.body;

			db.Mark.update({
				name
			}, {
				where: {
					id: +req.params.id
				}
			}).then(() => {
				res.redirect("/admin/marks")
			}).catch(errors => console.log(errors))
		} else {
			db.Mark.findByPk(+req.params.id).then((mark) => {
				res.render("./admin/editMark", {
					errors: errors.mapped(),
					old: req.body,
					userInSession: req.session.user ? req.session.user : "",
					mark,

				})
			}).catch(err => console.log(err))
		}
	},
	markDelete: (req, res) => {

		db.Mark.destroy({
			where: {
				id: +req.params.id
			}
		}).then(() => {
			res.redirect("/admin/marks")
		}).catch(errors => console.log(errors))

	},
}