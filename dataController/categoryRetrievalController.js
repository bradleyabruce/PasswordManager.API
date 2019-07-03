//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function () {

    router.route('/').post(function (req, res) {

        var userid = req.body.userid;

        if (userid == null) {
            res.send("UserId Required");
        }

        conn.connect().then(function () {

            var sqlQuery = "SELECT [CategoryName] FROM[PasswordManager].[dbo].[tCategories]";

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
                res.send("Error: " + err);
            });

        }).catch(function (err) {
            conn.close();
            res.send("Error: " + err);
        });


    });

    return router;

};

module.exports = routes;