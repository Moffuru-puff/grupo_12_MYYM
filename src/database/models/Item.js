const Product = require("./Product");

module.exports = function (sequelize, dataTypes) {

    let alias = "Item";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        price: {
            type: dataTypes.FLOAT(),
            allowNull: false,
        },
        total: {
            type: dataTypes.FLOAT()
        },
        subtotal: {
            type: dataTypes.FLOAT()
        },
        discount: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        name: {
            type: dataTypes.STRING(100)
        },
        barcode: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }


    }

    let config = {
        tableName: "items",
        timestamps: true

    }

    const Item = sequelize.define(alias, cols, config)

    Item.associate = models => {

        Item.belongsTo(models.Product, {
            as: "Product",
            foreignKey: "productId"
        }),
        Item.hasMany(models.Cart, {
            as:"Cart",
            foreignKey:"itemsId"
        })



    }


    return Item

}