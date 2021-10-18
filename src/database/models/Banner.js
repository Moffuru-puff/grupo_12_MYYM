module.exports = function (sequelize, dataTypes) {

    let alias = "Banner";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        urlImage: {
            type: dataTypes.STRING(100),
            allowNull: false
        }

    }

    let config = {
        tableName: "banners",
        timestamps: true

    }

    const Banner = sequelize.define(alias, cols, config)

    return Banner

}