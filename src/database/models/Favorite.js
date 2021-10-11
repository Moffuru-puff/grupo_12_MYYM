module.exports = function (sequelize, dataTypes) {

    let alias = "Favorite";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).USIGNED,
            allowNull: false,
            autoIncrement: true,
            prymaryKey: true
        },
        userId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }

    }

    let config = {
        tableName: "favorites",
        timestamps: true

    }

    const Favorite = sequelize.define(alias, cols, config)


    Favorite.associate = models => {

    Favorite.belongsTo(models.User, {
        as: "User",
        foreignKey:"UserId" 
    })
    Favorite.belongsTo(models.Product, {
        as: "Product",
        foreignKey:"productId" 
    })
    
    }

    return Favorite

}