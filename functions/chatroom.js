const conn = require('../database');
module.exports =  {
  getAllChatrooms (req, res) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT users.id as user_id, users.username as user_username, ' +
      'users.email as user_email, chatrooms.id as chatroom_id, chatrooms.name as chatroom_name, ' +
      'chatrooms.description as chatroom_description FROM chatrooms ' +
      'INNER JOIN users ON users.id = chatrooms.owner_id'
      , (error, result, fields) => {
        if(error) reject(error);
        resolve(result)
      })
    })
  }
}