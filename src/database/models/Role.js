module.exports = function (sequelize, dataTypes) {

    let alias = "Role";

    let cols = {
        id: {
            type: dataTypes.TINYINT(4),
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
        tableName: "roles",
        timestamps: true

    }

    const Role = sequelize.define(alias, cols, config)

    Role.associate = models => {

        Role.hasOne(models.User, {
            as: "User",
            foreignKey:"rolesId" 
        })
    
    }
    return Role

}