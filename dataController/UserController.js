//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function()
{

    router.route('/')//define route path
    .get(function(req, res)
    {

        conn.connect().then(function()
        {//connect to database

            var sqlQuery = "SELECT * FROM dbo.tUsers";//sql query
            var req = new sql.Request(conn);
            req.query(sqlQuery).then(function(recodset)
            {//call back for getting records

                res.json(recodset.recordset);//sending response in json format
                conn.close();

            })
            
                .catch(function(err)
                {
                    conn.close();
                    res.status(400).send("Error while getting data");
                });
        
         })

            .catch(function(err)
            {
                conn.close();
                 res.status(400).send("Error while getting data");
             });
    });

    return router;

};

module.exports = routes;