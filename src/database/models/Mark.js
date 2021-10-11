module.exports = function (sequelize, dataTypes) {

    let alias = "Mark";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }

    }

    let config = {
        tableName: "marks",
        timestamps: true

    }

    const Mark = sequelize.define(alias, cols, config)

    Mark.associate= models => {

        Mark.hasMany(models.Product, {
            as: "Product",
            foreignKey: "markId"
        })
        
    }

    return Mark

}