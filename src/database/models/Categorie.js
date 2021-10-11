module.exports = function (sequelize, dataTypes) {

    let alias = "Categorie";

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
        tableName: "categories",
        timestamps: true

    }

    const Categorie = sequelize.define(alias, cols, config)
   
    Categorie.associate = models => {
        Categorie.hasOne(models.Categoryproductid, {
            as: "Categoryproductid",
            foreignKey: "categoryId"
        })
    }


    return Categorie

}