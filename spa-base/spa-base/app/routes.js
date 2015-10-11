// app/routes.js
var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/partials', express.static(__dirname + '/partials'));

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});


// grab the nerd model we just created
var Nerd = require('../models/nerd');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/nerds', function (req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function (err, nerds) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(nerds); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        var path = require('path');
        res.sendfile(path.resolve('../public/views/index.html')); // load our public/index.html file
        //res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
    });

};
