//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function () {

    router.route('/').post(function (req, res) {

        var entryid = req.body.entryid;
        var newUsername = req.body.newUsername;
        var newPassword = req.body.newPassword;
        var newCategoryID = req.body.newCategoryID;

        if (entryid == null) {
            res.send("entryid required");
        }

        conn.connect().then(function () {

            var sqlQuery = "SELECT EntryID, WebsiteUsernameID, WebsitePasswordID, CategoryID FROM dbo.tEntries WHERE (EntryID = " + entryid + ")";

            var req = new sql.Request(conn);

            req.query(sqlQuery).then(function (result) {

                if (result.recordset.length == 0) {
                    res.json("No Results");
                }

                else {

                    //get values from select query
                    var WebsiteUsernameID = result.recordset[0].WebsiteUsernameID;
                    var WebsitePasswordID = result.recordset[0].WebsitePasswordID;
                    var CategoryID = result.recordset[0].CategoryID;

                    console.log(WebsiteUsernameID + " " + WebsitePasswordID)
                    newCategoryID++;


                    //update data in database with new sql call

                        var sqlQuery = "UPDATE tWebsitePasswords SET WebsitePassword = '" + newPassword + "' WHERE WebsitePasswordID = '" + WebsitePasswordID + "'; UPDATE tWebsiteUsername SET WebsiteUsername = '" + newUsername + "' WHERE WebsiteUsernameID = '" + WebsiteUsernameID + "'; UPDATE tEntries SET CategoryID = '" + newCategoryID + "' WHERE EntryID = '';";

                        var req = new sql.Request(conn);

                        req.query(sqlQuery).then(function (updateResult) {

                            res.json(updateResult.rowsAffected);

                        });
                }

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