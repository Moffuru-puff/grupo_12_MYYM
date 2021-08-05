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

app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/footer.html`) )
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/login.html`) )
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/register.html`))
})

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/submit.html`))
})

app.get('/detalleDelProducto', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/detalleDelProducto.html`))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/error404.html`) )
}) 

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}\n http://localhost:${port}`)
})