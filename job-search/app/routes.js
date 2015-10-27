var path = require('path');
var mongoose = require('mongoose');

module.exports = function (app) {
    
    mongoose.connect('mongodb://localhost/myJobsDB');
    var models = require(path.resolve('app/models'))(mongoose);
    
    app.get('/jobs', function (req, res) {
        models.Job.find(function (err, jobs) {
            if (err) {
                console.log('could not find jobs');
                return;

            }
            console.log('found jobs');
            res.send(jobs);
        });
    });

    app.put('/update', function (req, res) {
        /*todo: need to remove by ids*/
        var title = req.body.title;

        models.Job.remove({ title: title }, function (err) {
            if (err) {
                console.log('Failed to delete job: ' + title);
            }
            console.log('Deleted saved job successfully.');
        });

        res.send();
    });

    app.post('/add', function (req, res) {
        var title = req.body.title;
        var desc = req.body.description;
        var url = req.body.url;
        var companyName = req.body.companyName;

        var job = new models.Job({ title: title, description: desc, url: url, companyName: companyName });

        job.save(function (err) {
            if (err) {
                console.log('Failed to save job.');
                return;
            }

            console.log('job saved successfully');
            res.send();
        });
    });
   
    // route to handle all angular requests
    app.get('*', function (req, res) {
        var path = require('path');

        res.sendfile(path.resolve('public/index.html'));
    });

};
