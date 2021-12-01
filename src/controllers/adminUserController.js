const { validationResult } = require("express-validator");
let bcrypt = require('bcryptjs')
const db = require("../database/models");
const { Op } = require('sequelize')

module.exports = {
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
	usersAdminFilters: (req, res) => {
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
				case 'lastNameAsc':
					order = 'ASC';
					property = 'lastName';
					break;
				case 'lastNameDesc':
					order = 'DESC';
					property = 'lastName';
					break;
				case 'userAsc':
					order = 'ASC';
					property = 'user';
					break;
				case 'userDesc':
					order = 'DESC';
					property = 'user';
					break;
				default:
					break;
			}
				db.User.findAll({
					order: [
						[property, order]
					],
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
		}
	},
	usersAdminSearch: (req, res) => {
		
		let { searchAdmin, keyword } = req.query
		if (searchAdmin) {			

			switch (searchAdmin) {
				case 'id':
				
					db.User.findAll({
						where: {
							id: {
								[Op.like]: `${keyword}%`,
							},
						},
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

					break;
				case 'name':
					
					db.User.findAll({
						where: {
							name: {
								[Op.like]: `${keyword}%`,
							},
						},
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
					break;
				case 'lastName':
					db.User.findAll({
						where: {
							lastName: {
								[Op.like]: `${keyword}%`,
							},
						},
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

					break;
				case 'user':
					db.User.findAll({
						where: {
							user: {
								[Op.like]: `${keyword}%`,
							},
						},
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
					break;				
				default:
					alert('Error' + req.query);
					break;
			}
		}
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
				errors: errors.mapped(),
				old: req.body,
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
			]
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
				errors: errors.mapped(),
				old: req.body,
				userInSession: req.session.user ? req.session.user : "",
			});
		}
	},

	userDelete: (req, res) => {
		db.User.findByPk(+req.params.id)
			.then((user) => {
				let $addressesId = user.addressesId;
				db.Favorite.destroy({where: {userId: user.id}}).then(() => {})
				db.Cart.destroy({where: { userId: user.id}}).then(() => {})
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
};
