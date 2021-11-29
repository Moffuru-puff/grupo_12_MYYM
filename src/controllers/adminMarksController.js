const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = db.Sequelize.Op;

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
			console.log(mark);
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
				console.log(mark);
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