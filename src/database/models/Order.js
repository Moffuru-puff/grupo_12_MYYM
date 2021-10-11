module.exports = function (sequelize, dataTypes) {

    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        numberOrder: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }


    }

    let config = {
        tableName: "order",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

    return Order

}