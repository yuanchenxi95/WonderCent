
/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function() {
    var mongoose = require('mongoose');

    var AdminSchema = require('./job.schema.server')();

    var Admin = mongoose.model('Admin', AdminSchema);

    var api = {
        createAdmin: createAdmin,
        findAdminById: findAdminById,
        findAdminByCredentials: findAdminByCredentials,
        findAdminByUsername: findAdminByUsername,
        updatePassword: updatePassword
    };

    return api;

    function createAdmin(admin) {
        return Admin.create(admin);
    }

    function findAdminById(adminId) {
        return Admin.findOne({_id: adminId});
    }

    function findAdminByCredentials(username, password) {
        return Admin.findOne({username: username, password: password});
    }

    function findAdminByUsername(username) {
        return Admin.findOne({username: username});
    }

    function updatePassword(adminId, password) {
        return findAdminById(adminId)
            .then(
                function (admin) {
                    admin.password = password;
                    return admin.save();
                });
    }


};