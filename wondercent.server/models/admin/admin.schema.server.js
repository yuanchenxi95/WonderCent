/**
 * Created by ChenxiYuan on 6/25/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var AdminSchema = mongoose.Schema({
            username: String,
            password: String,
            dateCreated: {type: Date, default: Date.now()}
        },
        {
            collection: "wondercent.admin"
        }
    );

    return AdminSchema;
};
