var sql = require("mssql"); 

var connect = function () { 
var conn = new sql.ConnectionPool({ 
user: 'bruceba', 
password: 'password', 
server: '192.168.1.50', 
database: 'PasswordManager'
 })

 return conn; };
 module.exports = connect;