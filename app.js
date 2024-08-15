const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session')
const flash = require('connect-flash')
const dbConn = require('./config/mongooseConnection')
const adminsRoute = require('./routes/adminsRoute')
const usersRoute = require('./routes/usersRoute')
const productsRoute = require('./routes/productsRoute')
const indexRoute = require('./routes/indexRoute')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret: process.env.EXP_SES_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.use('/',indexRoute);
app.use('/users',usersRoute);
app.use('/products',productsRoute);
app.use('/admins',adminsRoute);
app.listen(3000);