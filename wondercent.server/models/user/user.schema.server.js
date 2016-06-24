module.exports = function () {
    var mongoose = require("mongoose");

    var ProfileSchema = require("./profile.schema.service")();
    var JobRoleSchema = require("./jobRole.schema.server")();

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
