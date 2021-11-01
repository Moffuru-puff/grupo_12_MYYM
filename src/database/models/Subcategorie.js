module.exports = function (sequelize, dataTypes) {

    let alias = "Subcategorie";

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
        },
        categoryId: {
            type: dataTypes.INTEGER(11),
            allowNull:false
        }

    }

    let config = {
        tableName: "subcategories",
        timestamps: true

    }

    const Subcategorie = sequelize.define(alias, cols, config)

    Subcategorie.associate = models => {

        Subcategorie.hasMany(models.Product, {
            as: "Products",
            foreignKey: "SubcategoryId"

        })
        Subcategorie.belongsTo(models.Categorie, {
            as: "category",
            foreignKey: "categoryId"
        })

    }


    return Subcategorie

}