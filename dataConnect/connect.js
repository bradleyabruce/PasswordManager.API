var sql = require("mssql"); 

var connect = function () { 
var conn = new sql.ConnectionPool({ 
user: '', 
password: '', 
server: '', 
database: ''
 })

 return conn; };
 module.exports = connect;