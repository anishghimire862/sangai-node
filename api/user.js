const conn = require('../database');
module.exports = {
  isValidUser(req, res) {
    let username = req.params.username;
    conn.query('SELECT username FROM users WHERE username = ?', [username], function(err, data) {
      data.length > 0 ? res.json({isValidUser: true}) : res.json({isValidUser: false})
    })
  }
}