let fs = require('fs');
const path = require('path');

module.exports = {
    getProducts : JSON.parse(fs.readFileSync(path.join(__dirname, '/dbProducts.json'), "utf-8")),
    carousel:  JSON.parse(fs.readFileSync(path.join(__dirname, '/banner.json'), "utf-8")),
    categories:  JSON.parse(fs.readFileSync(path.join(__dirname, '/categories.json'), "utf-8")),
    writeProductsJSON : (dataB) => {
        fs.writeFileSync(path.join(__dirname, '../db/dbProducts.json'), JSON.stringify(dataB), "utf-8")
    },
    users: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsersJSON: (dataB) => {
        fs.writeFileSync(path.join(__dirname, "../db/users.json"), JSON.stringify(dataB), "utf-8")
    },
    sucursales: JSON.parse(fs.readFileSync(path.join(__dirname, "/sucursales.json"), "utf-8")),
    writeSucursalesJSON: (dataB) => {
        fs.writeFileSync(path.join(__dirname, "../db/sucursales.json"), JSON.stringify(dataB), "utf-8")
    },
    getUsers : JSON.parse(fs.readFileSync('./db/users.json', "utf-8")),
    writeJsonUsers : (dataBase) => {
        fs.writeFileSync('./db/users.json', JSON.stringify(dataBase), 'utf-8')
    },
}