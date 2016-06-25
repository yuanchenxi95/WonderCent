/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();

    var User = mongoose.model('User', UserSchema);

    var api = {
        getMongooseModel: getMongooseModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByEmail: findUserByEmail,
        updatePassword: updatePassword,
        updateEmail: updateEmail,
        addFollowingUser: addFollowingUser,
        deleteUser: deleteUser,
        // findFacebookUser: findFacebookUser
    };

    return api;

    function getMongooseModel() {
        return User;
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findOne({_id: userId});
    }

    function findUserByCredentials(email, password) {
        return User.findOne({email: email, password: password});
    }

    function findUserByEmail(email) {
        return User.findOne({email: email});
    }

    function updatePassword(userId, password) {
        return findUserById(userId)
            .then(
                function (user) {
                    user.password = password;
                    return user.save();
                });
    }

    function updateEmail(userId, email) {
        return findUserById(userId)
            .then(
                function (user) {
                    user.email = email;
                    return user.save();
                });
    }


    function addFollowingUser(userId, addingId) {
        return findUserById(userId)
            .then(
                function(user) {
                    user._followingUsers.push(addingId);
                    return user.save();
                }
            );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};