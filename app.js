const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

/* Enrutadores */

let homeRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let adminRouter = require("./routes/admin");
/* let cargaDeProductosRouter = require("./routes/cargaDeProductos"); */
let arrepentimientoRouter = require("./routes/btnDeArrepentimiento");

let producRouter=require('./routes/producRouter');

let shoppingCartRouter = require('./routes/shoppingCart')

/* VIEWS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(express.static('public'));

/* Rutas */
app.use('/', homeRouter);
app.use('/admin', adminRouter);
/* app.use('/charge', cargaDeProductosRouter); */
app.use('/btnDeArrepentimiento', arrepentimientoRouter);

app.use('/user', usersRouter);

app.use('/shoppingCart', shoppingCartRouter);

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/submit.html`))
})

app.use('/detalleDelProducto', producRouter);

app.get('/shoppingCart', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/shoppingCart.html`) )
}) 
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/checkout.html`) )
}) 
app.get('/shipping', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/shipping.html`) )
}) 
app.get('/confirm', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/confirm.html`) )
}) 

app.get('/editprofile', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/editProfile.html`) )
}) 


app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}\n http://localhost:${port}`)
})