module.exports = function (sequelize, dataTypes) {

    let alias = "Valorationproduct";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        opinions: {
            type: dataTypes.STRING(255)
        },
        score: {
            type: dataTypes.FLOAT(),
            allowNull: false
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
        tableName: "valorationproduct",
        timestamps: true


    }

    const Valorationproduct = sequelize.define(alias, cols, config)

    Valorationproduct.associate = models => {

        Valorationproduct.belongsTo(models.Product, {
            as: "Product",
            foreignKey: "productId"
        }),
        Valorationproduct.belongsTo(models.User, {
            as: "User",
            foreignKey: "userId"
        })
    }

    return Valorationproduct

}