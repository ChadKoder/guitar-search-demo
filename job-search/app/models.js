module.exports = function (mongoose)
{
    var schema = mongoose.Schema;
    var jobModel = new schema({
        title: String,
        description: String,
        url: String,
        companyName: String
    });

    var job = mongoose.model('Job', jobModel);

    var models = {
        Job: job
    };

    return models;
};