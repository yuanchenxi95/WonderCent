/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function(userModel) {

    var user = userModel.getMongooseModel();

    var api = {
        createProfile: createProfile,
        getProfileFromUser: getProfileFromUser,
        updateProfile: updateProfile,
        deleteProfile: deleteProfile
    };

    return api;

};