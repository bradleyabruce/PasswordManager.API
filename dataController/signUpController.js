//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function () {

    router.route('/').post(function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            res.send("Email and password Required");
        }

        conn.connect().then(function () {

            var sqlQuery = "INSERT INTO [dbo].[tUsers] (UserLoginEmail, UserLoginPassword) VALUES ('" + email + "', '" + password + "'); SELECT SCOPE_IDENTITY()"

            var req = new sql.Request(conn);

            req.query(sqlQuery).then(function (recodset) {

                if (recodset.recordset.length == 0) {
                    res.json("No Results");
                }

                else {
                    res.json(recodset.recordset);//sending response in json format
                }

                conn.close();

            }).catch(function (err) {
                conn.close();
                res.send("Error while getting data");
            });

        }).catch(function (err) {
            conn.close();
            res.send("Error while getting data");
        });


    });

    return router;

};

module.exports = routes;