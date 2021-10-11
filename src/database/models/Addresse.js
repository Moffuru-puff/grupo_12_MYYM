module.exports = function (sequelize, dataTypes) {

    let alias = "Addresse";

    let cols = {

        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: dataTypes.STRING(100)
        },
        state: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(255)
        },
        country: {
            type: dataTypes.STRING(255)
        },
        postalCode: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },

    }

    let config = {
        tableName: "addresses",
        timestamps: true

    }

    const Addresse = sequelize.define(alias, cols, config)
    
    Addresse.associate = models => {
        Addresse.hasMany(models.Addresse, {
            as: "Addresse",
            foreignKey:"addressesId" 
        }),
        Addresse.hasOne(models.Branchoffice, {

            as: "Branchoffice",
            foreignKey:"addressId"
        })






    }
    

    return Addresse

}