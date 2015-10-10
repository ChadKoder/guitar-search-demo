// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// configuration ===========================================

var path = require('path');
//var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;
var db = require(path.resolve('../app/config/db'));
var port = process.env.PORT || 8080;

//TODO: DELETE THIS BELOW
var ObjectId = require('mongodb').ObjectID;
var insertDocument = function(db, callback) {
    db.collection('restaurants').insertOne( {
        "address" : {
            "street" : "2 Avenue",
            "zipcode" : "10075",
            "building" : "1480",
            "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
           {
               "date" : new Date("2014-10-01T00:00:00Z"),
               "grade" : "A",
               "score" : 11
           },
           {
               "date" : new Date("2014-01-16T00:00:00Z"),
               "grade" : "B",
               "score" : 17
           }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback(result);
    });
};

//Call the insertDocument function.
mongoClient.connect(db.url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});
    //TODO: DELETE ABOVE TEST CODE



// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('../app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

//let us know things are running               
console.log('Running on port: ' + port);

// expose app
exports = module.exports = app;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
   // BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('integration_tests', new Server("127.0.0.1", 27017,
 { auto_reconnect: false, poolSize: 4 }), { w: 0, native_parser: false });

// Establish connection to db
db.open(function (err, db) {
    assert.equal(null, err);
    console.log('connected to the server successfully.');
    //// Add a user to the database
    //db.addUser('user', 'name', function (err, result) {
    //    assert.equal(null, err);

    //    // Authenticate
    //    db.authenticate('user', 'name', function (err, result) {
    //        assert.equal(true, result);

    //        db.close();
    //    });
    //});
});