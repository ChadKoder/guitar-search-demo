var path = require('path');
var mongoose = require('mongoose');

module.exports = function (app) {
    
    mongoose.connect('mongodb://localhost/myGuitarsDB');
    var models = require(path.resolve('app/models'))(mongoose);
    
    app.get('/guitars', function (req, res) {
        models.Guitar.find(function (err, guitars) {
            if (err) {
                console.log('could not find guitars');
                return;

            }
            console.log('found guitars');
            res.send(guitars);
        });
    });

    app.put('/update', function (req, res) {
        /*todo: need to remove by ids*/
        var deleteMe = req.body;

        models.Guitar.remove(deleteMe, function(err) {
            if (err) {
                console.log('Failed to delete guitar: ' + JSON.stringify(deleteMe));
            }

            console.log('deleted guitar successfully: ' + JSON.stringify(deleteMe));
        });
        
        res.send();
    });

    app.post('/addFavorite', function (req, res) {
        var newGuitar = req.body;
        var guitar = new models.Guitar(newGuitar);
    
        guitar.save(function (err) {
            if (err) {
                console.log('Failed to save guitar.');
                return;
            }

            console.log('guitar saved successfully');
            res.send();
        });
    });
   
    // route to handle all angular requests
    app.get('*', function (req, res) {
        var path = require('path');

        res.sendfile(path.resolve('public/index.html'));
    });

};
