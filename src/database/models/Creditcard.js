module.exports = function (sequelize, dataTypes) {

    let alias = "Creditcard";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        numberCard: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        key: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        nameCard: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        bank: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        }


    }

    let config = {
        tableName: "creditcards",
        timestamps: true

    }

    const Creditcard = sequelize.define(alias, cols, config)

    Creditcard.associate = models => {

         Creditcard.belongsTo(models.User, {
            as: "User",
            foreignKey: /* "creditCardsId"  */ "userId"
        }) 
    
    }

    return Creditcard

}