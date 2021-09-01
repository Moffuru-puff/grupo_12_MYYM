const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

/* Enrutadores */

let homeRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let cargaDeProductosRouter = require("./routes/cargaDeProductos");
let arrepentimientoRouter = require("./routes/btnDeArrepentimiento");
const bodyParser = require('body-parser');


let producRouter=require('./routes/producRouter');

let shoppingCartRouter = require('./routes/shoppingCart')

/* VIEWS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* Rutas */
app.use('/', homeRouter);
app.use('/charge', cargaDeProductosRouter);
app.use('/btnDeArrepentimiento', arrepentimientoRouter);

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/index`) )
}) */

app.use('/', usersRouter);

app.use('/shoppingCart', shoppingCartRouter);

app.get('/header', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/header.html`) )
})

app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/footer.html`) )
})



app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/submit.html`))
})


app.use('/detalleDelProducto', producRouter);
/*app.get('/detalleDelProducto', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/detalleDelProducto.html`))
})*/




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






/* app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/cargaDeProductos.html`) )
}); */ 

app.get('/editprofile', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/editProfile.html`) )
}) 

/* app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `/views/error404.html`) )
})  */
 
app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}\n http://localhost:${port}`)
})