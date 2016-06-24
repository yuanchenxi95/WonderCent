/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function() {
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();

    var User = mongoose.model('User', UserSchema);

    var api = {
        getMongooseModel: getMongooseModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        // findFacebookUser: findFacebookUser
    };

    function getMongooseModel() {
        return User;
    }

    return api;

};