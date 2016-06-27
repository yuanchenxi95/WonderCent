/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/wondercent';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(connectionString);

    var jobModel = require('./job/job.model.server')();
    var userModel = require('./user/user.model.server')();
    var profileModel = require('./profile/profile.model.server')(userModel);
    var jobRoleModel = require('./jobRole/jobRole.model.server')(userModel);

    var models = {
        profileModel: profileModel,
        jobRoleModel: jobRoleModel,
        jobModel: jobModel,
        userModel: userModel,
    };

    return models;
};

