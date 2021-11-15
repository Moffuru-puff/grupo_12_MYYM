/* const { validationResult } = require("express-validator");
const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); */

module.exports = {
    index: (req, res) => {
		res.render("./admin/admin", {
			//toThousand,
			userInSession: req.session.user ? req.session.user : "",
		});
	}
}
