//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function () {

    router.route('/').post(function (req, res) {

        var entryid = req.body.entryid;

        if (entryid == null) {
            res.send("entryid required");
        }

        conn.connect().then(function () {

            var sqlQuery = "SELECT EntryID, WebsiteUsernameID, WebsitePasswordID, CategoryID FROM dbo.tEntries WHERE (EntryID = " + entryid + ")";

            var req = new sql.Request(conn);

            req.query(sqlQuery).then(function (recodset) {

                if (recodset.recordset.length == 0) {
                    res.json("No Results");
                }

                else {

                    var IRecordSet = recodset.recordset[0];
                    res.json(IRecordSet);

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