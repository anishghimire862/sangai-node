const mysql = require('mysql2');
const conn = mysql.createConnection({
    host     : '45.76.124.32',
    port     :  48177,
    user     : 'sangai',
    password : 'sangai',
    database : 'sangai'
});

conn.connect((err) => {
  if(err) throw err;
  console.log('Connected to database')
});
module.exports = conn;
