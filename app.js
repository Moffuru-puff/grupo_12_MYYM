const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const port = 3000;

/* Enrutadores */
let homeRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let adminRouter = require("./routes/admin");
let arrepentimientoRouter = require("./routes/btnDeArrepentimiento");
const bodyParser = require('body-parser');


let producRouter=require('./routes/producRouter');

let shoppingCartRouter = require('./routes/shoppingCart')

/* VIEWS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middlewares */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(methodOverride('_method'));

/* Rutas */
app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/btnDeArrepentimiento', arrepentimientoRouter);



app.use('/', usersRouter);

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