const mysql = require('mysql2');
const conn = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'sangainode',
    password : 'sangainode',
    database : 'sangainode'
});

conn.connect((err) => {
  if(err) throw err;
  console.log('Connected to database')
});
module.exports = conn;
