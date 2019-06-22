var express = require('express');//load library
var fs = require('fs')
var https = require('https')
var app = express();//create instance of express
var port = process.env.port || 1337;

//controllers
var loginController = require('./dataController/loginController')();
var signUpController = require('./dataController/signUpController')();
var entryRetrievalController = require('./dataController/entryRetrievalController')();
var categoryRetrievalController = require('./dataController/categoryRetrievalController')();

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());



    //after the user input is received, start the server on https
    https = https.createServer({
        key: fs.readFileSync('./dataEncrypt/server.key'),
        cert: fs.readFileSync('./dataEncrypt/server.cert')
    }, app).listen(port, /*'192.168.1.50',*/ function () {
        var datetime = new Date();
        var message = "Server running on port: " + port + " Started at: " + datetime;
        console.log(message);

    })

    //after the server starts, add controllers

    //login module 
    app.use("/api/login", loginController);

    //signup module    
    app.use("/api/signup", signUpController);

    //entry retrieval module    
    app.use("/api/entryRetrieval", entryRetrievalController);

    //category retrieval module 
    app.use("/api/categoryRetrieval", categoryRetrievalController);

    app.get("/api/Test", function (request, response) {

        response.sendStatus(200);
    });


   