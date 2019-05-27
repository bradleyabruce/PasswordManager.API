var express = require('express');//load library
var app = express();//create instance of express
var port = process.env.port || 1337;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());


var loginController = require('./dataController/loginController')();//loading userController module

app.use("/api/login", loginController);

//simple http server running on specific port number
app.listen(port, function(){
    var datetime = new Date();
    var message = "Server running on port: " + port + " Started at: " + datetime;
    console.log(message);
})

/*
* app is instance of express module
* .get("/product") is api path in browser for get command
* (request, reponse) is the call back function which is executed when path is matched
* response is sent in json format
*/
app.get("/product", function(request, response){

    response.json({"Message":"Welcome to Node js"});
});
