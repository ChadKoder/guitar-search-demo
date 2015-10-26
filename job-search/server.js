﻿// server.js
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
// configuration ===========================================
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set our port
var port = process.env.PORT || 8100;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require(path.resolve('app/routes'))(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// let us know things are running                    
console.log('Running on port: ' + port + '.......');



// expose app           
exports = module.exports = app;
