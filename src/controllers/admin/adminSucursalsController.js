const { validationResult } = require("express-validator");
const db = require("../../database/models");
const fs = require("fs");

module.exports = {
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
				}).then(() => {});
			});
			res.redirect("/admin/sucursals");
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
}