
//TODO: DELETE THIS BELOW
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var ObjectId = require('mongodb').ObjectID;
var insertDocument = function (db, callback) {
    db.collection('restaurants').insertOne({
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "grades": [
           {
               "date": new Date("2014-10-01T00:00:00Z"),
               "grade": "A",
               "score": 11
           },
           {
               "date": new Date("2014-01-16T00:00:00Z"),
               "grade": "B",
               "score": 17
           }
        ],
        "name": "Vella",
        "restaurant_id": "41704620"
    }, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback(result);
    });
};

//Call the insertDocument function.
//mongoClient.connect(db.url, function(err, db) {
//    assert.equal(null, err);
//    insertDocument(db, function() {
//        db.close();
//    });
//});

var findRestaurants = function (db, callback) {
    var cursor = db.collection('restaurants').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

MongoClient.connect(db.url, function (err, db) {
    assert.equal(null, err);
    console.log('begin retrieving restaurants...');
    findRestaurants(db, function () {
        db.close();
    });
    console.log('end retrieving restaurants...');
});

var removeRestaurants = function (db, callback) {
    db.collection('restaurants').deleteMany(
       { "borough": "Manhattan" },
       function (err, results) {
           console.log(results);
           callback();
       }
    );
};

//mongoClient.connect(db.url, function (err, db) {
//    assert.equal(null, err);
//    console.log('Deleting restaurants');
//    removeRestaurants(db, function () {
//        db.close();
//    });
//});
//TODO: DELETE ABOVE TEST CODE