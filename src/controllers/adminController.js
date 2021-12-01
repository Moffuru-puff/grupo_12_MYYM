const db = require("../database/models");
const { Op } = db.Sequelize.Op;

module.exports = {
    index: (req, res) => {
		res.render("./admin/admin", {
			//toThousand,
			userInSession: req.session.user ? req.session.user : "",
		});
	}
}
