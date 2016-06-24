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

    // var jobModel = require('./')

    var models = {
        //TODO map models
    };

    return models;
};

