const db = require("../../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    allProducts: (req, res) => {
        db.Product.findAll({ include: [{ association: "productimage" }] })
        .then( Products => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: Products.length
                },
                data: Products
            })
        })
    },
}