//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function () {

    router.route('/').post(function (req, res) {

        var userid = req.body.userid;
        var categoryid = req.body.categoryid;

        if (userid == null || categoryid == null) {
            res.send("UserId and CategoryID Required");
        }

        conn.connect().then(function () {

            var sqlQuery = "";

            if (categoryid == "0") {

                sqlQuery = "SELECT dbo.tWebsiteDomains.WebsiteDomain, dbo.tWebsiteUsername.WebsiteUsername, dbo.tEntries.EntryID, dbo.tEntries.CategoryID FROM dbo.tEntries INNER JOIN dbo.tWebsiteUsername ON dbo.tEntries.WebsiteUsernameID = dbo.tWebsiteUsername.WebsiteUsernameID INNER JOIN dbo.tWebsiteDomains ON dbo.tEntries.WebsiteDomainID = dbo.tWebsiteDomains.WebsiteDomainID INNER JOIN dbo.tUsers ON dbo.tEntries.UserID = dbo.tUsers.UserID WHERE(dbo.tUsers.UserID = " + userid + ")";
            }
            else {

                sqlQuery = "SELECT dbo.tWebsiteDomains.WebsiteDomain, dbo.tWebsiteUsername.WebsiteUsername, dbo.tEntries.EntryID, dbo.tEntries.CategoryID FROM dbo.tEntries INNER JOIN dbo.tWebsiteUsername ON dbo.tEntries.WebsiteUsernameID = dbo.tWebsiteUsername.WebsiteUsernameID INNER JOIN dbo.tWebsiteDomains ON dbo.tEntries.WebsiteDomainID = dbo.tWebsiteDomains.WebsiteDomainID INNER JOIN dbo.tUsers ON dbo.tEntries.UserID = dbo.tUsers.UserID WHERE(dbo.tUsers.UserID = " + userid + ") AND(dbo.tEntries.CategoryID =" + categoryid + ")";
            }

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