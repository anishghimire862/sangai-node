const conn = require('../database');
const userFunction = require('../functions/user');
const chatroomFunction = require('../functions/chatroom');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
let session;

const multerStorage = require('../multer');
const upload = multer({storage: multerStorage.storage})

const notificationsApi = require('../api/notifications');
const ecardApi = require('../api/ecard');
const userApi = require('../api/user');
const feedApi = require('../api/feed');

module.exports = function(app) {
  app.get('/', function(req, res) {
    req.session.loggedIn ? res.redirect('/home') : res.render('index');
  });
  
  app.get('/register', function(req, res) {
    const user = {
      email: '',
      username: '',
      password: ''
    }
    req.session.loggedIn ? res.redirect('/home') : res.render('register', { user: user, formErrors: []});
  });

  app.get('/home', isLoggedIn, async function(req, res) {
    let allUsers = await userFunction.getAllUsers();
    let chatrooms = await chatroomFunction.getAllChatrooms();
    res.render('home', { allUsers: allUsers, chatrooms: chatrooms });
  })

  app.post('/register', [
      body('email').isEmail().withMessage('Please enter a valid email address.'),
      body('username')
        .isLength({ min: 3, max: 50 }).withMessage('Username should be between 3 to 50 characters.')
        .matches(/^([a-zA-Z])[a-zA-Z0-9\-._]+$/).withMessage('Username usually starts with a-z characters and may include numbers (0-9) or special symbols . - _'),
      body('password').isLength({ min: 6, max: 250 }).withMessage('Password should be between 6 to 250 characters.')
    ], async function(req, res) {

    const user = {
      email: req.body.email,
      username: req.body.username.toLowerCase(),
      password: req.body.password
    }

    let formErrors = [];

    if(!user.email && !user.username && !user.password) {
      req.flash('error', 'Can not process empty fields.')
      res.render('register', { user: user, formErrors: formErrors });
    }

    const isEmailExists = await userFunction.checkIfUserEmailExists(user.email);
    const isUsernameExists = await userFunction.checkIfUsernameExists(user.username);
    if(isEmailExists) {
      req.flash('error', 'Email already exists. Please select another email.')
      res.render('register', { user: user, formErrors: formErrors });
    } else if (isUsernameExists) {
      req.flash('error', 'Usernmae already exists. Please select another username.')
      res.render('register', { user: user, formErrors: formErrors });
    } else {
      const errors = validationResult(req);
      if(errors.errors.length === 0) {
        conn.query('INSERT INTO users SET ?', user, function(err, data) {
          if(err)
            console.log(err)
          else {
            req.flash('success', 'User created successfully. Please login to continue.');
            res.redirect('/');
          }
        })
      } else {
        formErrors = errors.array();
        res.render('register', { user: user, formErrors: formErrors })
      }
    }
  });

  app.post('/login', function(req, res) {
    const email_or_username = req.body.email_or_username;
    const password = req.body.password;
    
    if(email_or_username && password) {
      conn.query('SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?', [email_or_username, email_or_username, password], function(err, data) {
        if(data.length > 0) {
          session = req.session;
          req.session.loggedIn = true;
          req.session.loggedInUser = data[0]
          res.redirect('/home')
        } else {
          req.flash('error', 'Incorrect username/email or password.');
          res.redirect('/')
        }
      })
    } else {
      req.flash('error', 'Username/email and password can not be blank.');
      res.redirect('/')
    }
  });

  app.get('/logout', function(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err); 
      }
      res.redirect('/');
    })
  });

  app.post('/ecard', upload.single('ecard'), (req, res, next) => {
    ecardApi.postEcard(req, res, next);
  })

  app.get('/notifications', (req,res) => {
    notificationsApi.getNotifications(req, res);
  })

  app.get('/valid_users/:username', (req,res) => {
    userApi.isValidUser(req, res)
  })

  app.post('/feeds', (req, res) => {
    feedApi.postFeed(req, res)
  })

  app.post('/comments', (req, res) => {
    feedApi.postComment(req, res)
  })

  app.post('/like_feed', (req, res) => {
    feedApi.likeFeed(req, res)
  })

  app.get('/feeds/:skip', (req, res) => {
    let skip = req.params.skip;
    feedApi.getFeeds(req, res, skip)
  })

  app.get('/comments/:feedId', (req, res) => {
    feedApi.getComments(req, res)
  })

  function isLoggedIn(req, res, next) {
    if(req.session.loggedIn) {
      return next();
    }
    res.redirect('/');
  }
}
