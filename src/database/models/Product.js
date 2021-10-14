module.exports = function (sequelize, dataTypes) {

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        mainFeatures: {
            type: dataTypes.STRING(255),
            allowNull: false

        },
        price: {
            type: dataTypes.FLOAT(),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        barcode: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        description: {
            type: dataTypes.STRING(255)
        },
        imagesId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        subcategoryId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        markId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        valorationsId: {
            type: dataTypes.INTEGER(11).UNSIGNED,

        }

    }

    let config = {
        tableName: "products",
        timestamps: true

    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Subcategorie, {
            as:"Subcategorie",
            foreignKey: "subcategoryId"
        }),
        Product.belongsTo(models.Mark, {
            as:"Mark",
            foreignKey: "markId"
        }),
        Product.hasMany(models.Productsimage, {
            as: "productimage",
            foreignKey: "productId"
        }),
        Product.hasMany(models.Valorationproduct, {
            as: "Valorationproduct",
            foreignKey: "productId"
        }),
        Product.hasOne(models.Item, {
            as: "Item",
            foreignKey: "ProductId"
        }),
        Product.hasOne(models.Favorite, {
            as: "Favorite",
            foreignKey: "productId"
        })
      
    }

    return Product

}