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

       var email = req.query.email;
       var password = req.query.password;
      
       if (email == null || password == null) {
          res.status(400).send("Email and password Required");
       }

       conn.connect().then(function()
       {
          
          var sqlQuery = "SELECT [UserID], [UserLoginEmail], [UserLoginPassword] FROM[PasswordManager].[dbo].[tUsers] WHERE UserLoginEmail = '" + email + "' AND UserLoginPassword = '" + password + "';";//sql query

           var req = new sql.Request(conn);
           req.query(sqlQuery).then(function(recodset)
           {//call back for getting records

              if (recodset.recordset.length == 0) {
                 res.json("No Results");
              }
              else {
                 res.json(recodset.recordset);//sending response in json format
              }
                 conn.close();
                                 
           })
            
                .catch(function(err)
                {
                   conn.close();
                   res.send("Error while getting data");
                });
        
         })

            .catch(function(err)
            {
                conn.close();
                 res.send("Error while getting data");
             });

       
    });

    return router;

};

module.exports = routes;