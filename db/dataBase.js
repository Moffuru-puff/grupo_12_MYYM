let fs = require('fs');

module.exports = {
    getProducts : JSON.parse(fs.readFileSync('./db/dbProducts.json', "utf-8")),
    writeJson : (dataBase) => {
        fs.writeFileSync(`./db/dbProducts.json`, JSON.stringify(dataBase), "utf-8")
    }

}