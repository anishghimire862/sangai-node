const conn = require('../database');
module.exports = {
  getNotifications(req, res) {
    const user = req.session.loggedInUser.username;
    conn.query('SELECT * FROM notifications WHERE receiver = ?', [user], function(err, data) {
      res.json({data})
    })
  }
}