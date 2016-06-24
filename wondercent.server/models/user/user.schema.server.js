module.exports = function () {
    var mongoose = require("mongoose");

    var ProfileSchema = require("./profile.schema.service")();
    var JobRoleSchema = require("./jobRole.schema.server")();

    var UserSchema = mongoose.Schema({
        profile         : ProfileSchema,
        softDelete      : {type: Boolean, default: false},
        dateCreated     : {type: Date, default: Date.now()},
        jobRoles        : [JobRoleSchema],

        _followingUsers  : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        _followerUsers   : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }, { collection: "wondercent.user"});
    return UserSchema;
};
