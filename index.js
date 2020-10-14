const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const socket = require('./lib/socket');

const app = express();
const http = require('http').createServer(app);
socket.listen(http);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser('secret key'));
app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 60000 * 60 * 24 }
}));
app.use(function(req, res, next) {
  res.locals.loggedInUser = req.session.loggedInUser;
  res.locals.loggedIn = req.session.loggedIn;
  next();
})
app.use(flash());

require('./routes/route')(app);

app.set('views', './views/pages');
app.set('view engine','ejs');

const conn = require('./database');

http.listen(3000, () => {
  console.log("Server is Running...")
});