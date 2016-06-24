/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function(userModel) {

    var User = userModel.getMongooseModel();

    var api = {
        updateProfile: updateProfile,
        deleteProfile: deleteProfile
    };

    return api;


    function updateProfile(profile, userId) {
        return User
            .findOne({_id: userId})
            .then(function(user) {
                user.profile = profile;
                return user.save();
            });
    }

    function deleteProfile(userId) {
        return User
            .findOne({_id: userId})
            .then(function(user) {
                user.profile = null;
                return user.save();
            });
    }

};