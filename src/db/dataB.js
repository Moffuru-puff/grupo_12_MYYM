let fs = require('fs');
const path = require('path');
let dbProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '/dbProducts.json'), "utf-8"));
let dbUser =  JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8"));

function saveDB(db, nameFile){   
        fs.writeFileSync(path.join(__dirname, `../db/${nameFile}`), JSON.stringify(db), "utf-8")
}

module.exports = {
    addUserFavorite : (userId, productId) => {
        dbUser.find(user => {
           
            if (user.id == userId) {
                user.favorites[productId] = true 
                
                saveDB(dbUser, 'users.json')
            } 
        })
        return true
    },
    deleteUserFavorite : (userId, productId) => {
        dbUser.find(user => {
           
            if (user.id == userId) {
                delete user.favorites[productId]
                
                saveDB(dbUser, 'users.json')
            } 
        })
        return true
    },
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
    getUsers : JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'), "utf-8")),
    writeJsonUsers : (dataBase) => {
        fs.writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(dataBase), 'utf-8')
    },
}