const conn = require('../database');
module.exports =  {
  checkIfUserEmailExists (email) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT username FROM users WHERE email=?', [email], (error, result, fields) => {
        if(error) reject(error);
        result && result.length > 0 ? resolve(true) : resolve(false);
      })
    })
  },
  
  checkIfUsernameExists (username) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT username FROM users WHERE username=?', [username], (error, result, fields) => {
        if(error) reject(error);
        result && result.length > 0 ? resolve(true) : resolve(false);
      })
    })
  },
  
  getAllUsers (req, res) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users', (error, result, fields) => {
        if(error) reject(error);
        resolve(result)
      })
    })
  }
}
