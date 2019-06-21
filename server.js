var express = require('express');//load library
var fs = require('fs')
var https = require('https')
var app = express();//create instance of express
var port = process.env.port || 1337;
const inquirer = require('inquirer')//for user input

//controllers
var loginController = require('./dataController/loginController')();
var signUpController = require('./dataController/signUpController')();
var retrievalController = require('./dataController/retrievalController')();

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

//get user input
var questions = [
    {
        type: 'input',
        name: 'serverAddress',
        message: "Server Address:",
    },
    {
        type: 'input',
        name: 'database',
        message: "Database Name:",
    },
    {
        type: 'input',
        name: 'user',
        message: "UserName:",
    },
    {
        type: 'input',
        name: 'password',
        message: "Password:",
    },
]

inquirer.prompt(questions).then(answers => {
    var serverAddress = (`${answers['serverAddress']}`)
    var database = (`${answers['database']}`)
    var user = (`${answers['user']}`)
    var password = (`${answers['password']}`)

    //write connection file from user input
    fs.writeFile('./dataConnect/connect.js', "var sql = require(\"mssql\"); \r\n\r\nvar connect = function () { \r\nvar conn = new sql.ConnectionPool({ \r\nuser: '" + user + "', \r\npassword: '" + password + "', \r\nserver: '" + serverAddress + "', \r\ndatabase: '" + database + "'\r\n })\r\n\r\n return conn; };\r\n module.exports = connect;", function (err) {
        if (err) {
            return console.log(err);
        }
        //console.log("The file was saved!");
    });
}).then(function () {
    
    //after the user input is received, start the server on https
    https = https.createServer({
        key: fs.readFileSync('./dataEncrypt/server.key'),
        cert: fs.readFileSync('./dataEncrypt/server.cert')
    }, app).listen(port, /*'192.168.1.50',*/ function () {
        var datetime = new Date();
        var message = "Server running on port: " + port + " Started at: " + datetime;
        console.log(message);

    });
}).then(function () {

    //after the server starts, add controllers

    //login module 
    app.use("/api/login", loginController);

    //signup module    
    app.use("/api/signup", signUpController);

    //retrieval module    
    app.use("/api/retrieval", retrievalController);

    app.get("/api/Test", function (request, response) {

        response.sendStatus(200);
    });

})
   