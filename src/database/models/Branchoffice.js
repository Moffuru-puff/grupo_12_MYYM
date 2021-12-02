module.exports = function (sequelize, dataTypes) {

    let alias = "Branchoffice";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        addressId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        schedule: {
            type: dataTypes.STRING(255)
        },
        telephone: {
            type: dataTypes.INTEGER(11).UNSIGNED
        },
        description: {
            type: dataTypes.STRING(255)
        }


    }

    let config = {
        tableName: "branchoffices",
        timestamps: true

    }

    const Branchoffice = sequelize.define(alias, cols, config)

    Branchoffice.associate= models => {

        Branchoffice.belongsTo(models.Addresse, {

            as: "Address",
            foreignKey: "addressId"
        })

    }

    return Branchoffice

}