module.exports = function () {
    var mongoose = require("mongoose");

    var profileSchema = require("./profile.schema.service")();
    var jobRole = require("./jobRole.schema.server")();

    var UserSchema = mongoose.Schema({
        profile: profileSchema,
        softDelete: {type: Boolean, default: false},
        dateCreated: {type: Date, default: Date.now()},
        jobRole: jobRole,
        followingUsers: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        followerUsers: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }, { collection: "wondercent.user"});
    return UserSchema;
};
