var express = require('express');//load library
var fs = require('fs')
var https = require('https')
var app = express();//create instance of express
var port = process.env.port || 1337;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

//login module
var loginController = require('./dataController/loginController')();
app.use("/api/login", loginController);

//signup module
var signUpController = require('./dataController/signUpController')();
app.use("/api/signup", signUpController);

https.createServer({
    key: fs.readFileSync('./dataEncrypt/server.key'),
    cert: fs.readFileSync('./dataEncrypt/server.cert')
}, app).listen(port, /*'192.168.1.50',*/function(){
    var datetime = new Date();
    var message = "Server running on port: " + port + " Started at: " + datetime;
    console.log(message);
})

/*
* app is instance of express module
* .get("/api/Test") is api path in browser for get command
* (request, reponse) is the call back function which is executed when path is matched
* response is sent in json format
*/
app.get("/api/Test", function(request, response){

    response.sendStatus(200);
});
