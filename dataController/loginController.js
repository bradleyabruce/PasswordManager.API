//load external module
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../dataConnect/connect")();


var routes = function()
{

    router.route('/').post(function(req, res)
    {

       var email = req.body.email;
       var password = req.body.password;
      
       if (email == null || password == null) {
          res.send("Email and password Required");
       }

       conn.connect().then(function()
       {
          
          var sqlQuery = "SELECT [UserID], [UserLoginEmail], [UserLoginPassword] FROM[PasswordManager].[dbo].[tUsers] WHERE UserLoginEmail = '" + email + "' AND UserLoginPassword = '" + password + "';";

           var req = new sql.Request(conn);

           req.query(sqlQuery).then(function(recodset)
           {

               if (recodset.recordset.length == 0)
               {
                 res.json("No Results");
               }

               else
               {
                 res.json(recodset.recordset);//sending response in json format
               }

                 conn.close();
                        
           }).catch(function(err)
           {
                   conn.close();
               res.send("Error: " + err);
           });
        
       }).catch(function(err)
       {
                conn.close();
           res.send("Error: " + err);
       });

       
    });

    return router;

};

module.exports = routes;