module.exports = function (sequelize, dataTypes) {

    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(16)
        },
        lastName: {
            type: dataTypes.STRING(25)
        },
        telephone: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
 /*        favoritesId: {
            type: dataTypes.INTEGER(5).UNSIGNED,
            allowNull: false
        }, */
        rolesId: {
            type: dataTypes.TINYINT(4),
            allowNull: false
        },
        addressesId: {
            type: dataTypes.INTEGER(11).UNSIGNED

        },
 /*        cartId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        creditCardsId: {
            type: dataTypes.INTEGER(11).UNSIGNED

        } */


    }

    let config = {
        tableName: "users",
        timestamps: true

    }

    const User = sequelize.define(alias, cols, config)
   
    User.associate = models => {
       
        User.belongsTo(models.Role, {
            as: "Role",
            foreignKey:"rolesId" 
        }),
        User.belongsTo(models.Cart, {
            as: "Cart",
            foreignKey:/* "cartId" */ "userId"
        }),
        User.belongsTo(models.Addresse, {
            as: "Addresse",
            foreignKey:"addressesId" 
        }),
        User.hasMany(models.Favorite, {
            as: "Favorite",
            foreignKey:/* "favoritesId" */ "userId"
        }),
        User.belongsTo(models.Creditcard, {
            as: "Creditcard",
            foreignKey:/* "creditCardsId" */ "userId"
        }),
        User.hasOne(models.Valorationproduct, {
            as: "Valorationproduct",
            foreignKey:"userId" 
        })


    }


  
    return User

}