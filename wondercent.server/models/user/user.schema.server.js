module.exports = function () {
    var mongoose = require("mongoose");

    var ProfileSchema = require("../profile/profile.schema.server.js")();
    var JobRoleSchema = require("../jobRole/jobRole.schema.server.js")();

    var UserSchema = mongoose.Schema({
        profile         : ProfileSchema,
        email       : String,
        password    : String,
        _followingUsers  : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        // _followerUsers   : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

        jobRoles        : [JobRoleSchema],

        dateCreated     : {type: Date, default: Date.now()},
        softDelete      : {type: Boolean, default: false}
    }, { collection: "wondercent.user"});
    return UserSchema;
};
