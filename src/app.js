const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const port = 3000;
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const localsCheck = require('./middlewares/localsCheck')
let categoriesHeader = require('./middlewares/categoriesHeader')
let marksHeader = require('./middlewares/marksHeader')


/* Enrutadores */
let homeRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let adminRouter = require("./routes/admin");
let arrepentimientoRouter = require("./routes/btnDeArrepentimiento");
let producRouter = require('./routes/producRouter');
let shoppingCartRouter = require('./routes/shoppingCart')
let apiRouter = require('./routes/apiRouter') 


/* VIEWS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middlewares */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
    secret: "myymGamers",
    resave: false,
    saveUninitialized: true
}))

app.use(localsCheck)

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(categoriesHeader)
app.use(marksHeader)
//app.use(userApp)


/* Rutas */
app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/btnDeArrepentimiento', arrepentimientoRouter);

app.use('/', usersRouter);

app.use('/shoppingCart', shoppingCartRouter);

app.use('/detalleDelProducto', producRouter);
app.use('/api', apiRouter); //APIs



app.use((req,res, next)=>{
    res.status(404).render('error404', {
        userInSession : req.session.user ? req.session.user : ''
    })
    next()
})


app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}\n http://localhost:${port}`)
})