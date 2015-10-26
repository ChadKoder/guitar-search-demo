// server.js
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
// config files
//var db = require('../config/db');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myJobsDB');

var Job = mongoose.model('Job', { title: String, description: String });//, url: String, companyName: String });
//var job = new Job({ title: 'job1' });

app.get('/jobs', function(req, res) {
    Job.find(function (err, jobs) {
       if (err) {
           console.log('could not find jobs');
           return;

       }
        console.log('found jobs');
        res.send(jobs);
    });
});

app.post('/add', function(req, res) {
    var title = req.body.title;
    var desc = req.body.description;

    var job = new Job({ title: title, description: desc });
    job.save(function (err) {
        if (err) {
            console.log('error. job was not saved.');
            return;
        }

        console.log('job saved successfully');
        res.send();
     });
});


//col.remove({}, function () {
//    console.log('dlete called');
//});
//col.save({ title: 'title1' }, function (err, test) {
//    console.log('save called');
//});


//var db = require(path.resolve('config/db'));


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
