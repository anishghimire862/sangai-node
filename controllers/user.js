const conn = require('../database');
module.exports = {
  checkIfUserEmailExists (email) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE email=?', [email], (error, result, fields) => {
        if(error) reject(err);
        result.length > 0 ? resolve(true) : resolve(false);
      })
    })
  },

  checkIfUsernameExists (username) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE username=?', [username], (error, result, fields) => {
        if(error) reject(err);
        result.length > 0 ? resolve(true) : resolve(false);
      })
    })
  }
} 