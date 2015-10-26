module.exports = function(mongoose) {
    var jobModel =
        {
        title: String,
        description: String,
        url: String,
        companyName: String
        };

    var job = mongoose.model('Job', jobModel);

    var models = {
        Job: job
    };

    return models;
};