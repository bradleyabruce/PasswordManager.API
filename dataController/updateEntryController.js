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
                   // res.json(recodset.recordset);//sending response in json format
                   var array = [recodset.recordset[0]];
                   //recodset.json(array[0]);
                   for (i = 0; i < array.length; i++) {
                    if(i == 2){
                        res.json(array[i]);
                    }
                  } 
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