const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
// const expressValidator = require('express-validator');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser('secret key'));
app.use(session({
  secret: '123456cat',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 60000 * 60 * 24 }
}));
app.use(flash());

require('./routes/route')(app);

app.set('views', './views/pages');
app.set('view engine','ejs');

const conn = require('./database');

app.listen(3000, () => console.log("Server is Running..."));