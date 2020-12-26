const mysql = require('mysql2');
const conn = mysql.createConnection({
    host     : '144.91.117.143',
	port	 : 48177,
    user     : 'root',
    password : 'example',
    database : 'sangai'
});

conn.connect((err) => {
  if(err) throw err;
  console.log('Connected to database')
});
module.exports = conn;
