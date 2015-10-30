module.exports = function (mongoose)
{
    var schema = mongoose.Schema;
    var guitarModel = new schema({
        Company: String,
        Model: String,
        Description: String,
        BodyType: String,
        TotalFrets: String,
        FinishTop: String,
        FinishNeck: String,
        FinishBackSides: String,
        Price: String,
        Url: String
    });

    var guitar = mongoose.model('Guitar', guitarModel);

    var models = {
        Guitar: guitar
    };

    return models;
};