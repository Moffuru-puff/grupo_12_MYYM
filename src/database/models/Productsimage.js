module.exports = function (sequelize, dataTypes) {

    let alias = "Productsimage";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }

    }

    let config = {
        tableName: "productsimages",
        timestamps: true

    }

    const Productsimage = sequelize.define(alias, cols, config)

    Productsimage.associate = models => {
        Productsimage.belongsTo(models.Product, {
            as: "product",
            foreignKey:"productId"
        })
    }

    return Productsimage

}