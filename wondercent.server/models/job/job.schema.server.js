/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var JobSchema = mongoose.Schema({
        _employerUser    : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        _employeeUser    : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        _requestedUsers  : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

        price          : Number,
        // set default due date to 2099-01-01
        dateDue         : {type: Date, default: new Date('2099-01-01')},

        name            : String,
        description     : String,
        tags            : [String],
        imageUrl        : String,

        dateCreated     : {type: Date, default: Date.now()},
        softDelete      : {type: Boolean, default: false}
    }, {collection: "wondercent.job"});
    return JobSchema;
};
