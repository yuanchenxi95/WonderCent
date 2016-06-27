/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function(userModel) {

    var User = userModel.getMongooseModel();

    var api = {
        updateProfile: updateProfile,
        deleteProfile: deleteProfile,
        findProfileByKeyword: findProfileByKeyword
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

    function findProfileByKeyword(keyword) {
        return User
            .find({
                $or :
                    [
                        {"profile.firstName": new RegExp(keyword, 'i')},
                        {"profile.lastName": new RegExp(keyword, 'i')},
                        {"profile.major": new RegExp(keyword, 'i')},
                        {"profile.field": new RegExp(keyword, 'i')},
                        {"profile.description": new RegExp(keyword, 'i')}]
                })
            .select("_id profile");
    }

};