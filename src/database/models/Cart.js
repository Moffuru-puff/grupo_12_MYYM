module.exports = function (sequelize, dataTypes) {

    let alias = "Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataTypes.FLOAT()
        },
        totalItems: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        userId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        itemsId: {
            type: dataTypes.INTEGER(11).UNSIGNED
        }
    }

    let config = {
        tableName: "cart",
        timestamps: true

    }

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = models => {

        Cart.belongsTo(models.Item, {

            as: "Item",
            foreignKey: "itemsId"
        })
        Cart.belognsTo(models.Cart, {

            as: "Cart",
            foreignKey: "userId"
        })



    }

    return Cart

}