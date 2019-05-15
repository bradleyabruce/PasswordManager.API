var sql = require("mssql");

var connect = function(){

    var conn = new sql.ConnectionPool({
        user: 'bruceba',
        password: 'password',
        server: '74.140.136.128',
        database: 'PasswordManager'
    })

    return conn;
};

module.exports = connect;