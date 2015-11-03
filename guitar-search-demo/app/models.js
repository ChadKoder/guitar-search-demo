module.exports = function (mongoose)
{
    var schema = mongoose.Schema;
    var guitarModel = new schema({
        _id: String,
        Company: String,
        Model: String,
        Description: String,
        BodyType: String,
        TotalFrets: String,
        FinishTop: String,
        FinishNeck: String,
        FinishBackSides: String,
        Price: String,
        Url: String,
        ImgUrl: String
    });

    var guitar = mongoose.model('Guitar', guitarModel);

    var models = {
        Guitar: guitar
    };

    return models;
};