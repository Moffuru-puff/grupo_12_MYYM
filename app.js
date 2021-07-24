const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/index.html`) )
})

app.get('/header', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/header.html`) )
})

app.listen(port, () => {
    console.log(`Puerto corriendo en ${port}\n http://localhost:${port}`)
})