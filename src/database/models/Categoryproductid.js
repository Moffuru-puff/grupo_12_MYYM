module.exports = function (sequelize, dataTypes) {

    let alias = "Categoryproductid";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        categoryId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        subcategoryId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }

    }

    let config = {
        tableName: "categoryproductid",
        timestamps: true

    }

    const Categoryproductid = sequelize.define(alias, cols, config)

    Categoryproductid.associate = () => {
       
        Categoryproductid.hasOne(models.Product, {

            as: "Product",
            foreignKey:"categoryProductId"
        })
        Categoryproductid.belongsTo(models.Categorie, {

            as: "Categorie",
            foreignKey:"categoryId"
        })
        Categoryproductid.belongsTo(models.Subcategorie, {

            as: "Subcategorie",
            foreignKey:"subcategoryId"
        })



    }

    return Categoryproductid

}