/**
 * Created by ChenxiYuan on 6/24/16.
 */
/**
 * Created by ChenxiYuan on 6/24/16.
 */


module.exports = function() {
    var mongoose = require('mongoose');

    var JobSchema = require('./job.schema.server')();

    var Job = mongoose.model('Job', JobSchema);

    var api = {
        getMongooseModel: getMongooseModel,
        createJob: createJob,
        findJobById: findJobById,
        findJobByJobname: findJobByJobname,
        findJobByPriceRange: findJobByPriceRange,
        updateJob: updateJob,
        deleteJob: deleteJob
    };

    function getMongooseModel() {
        return Job;
    }

    return api;

};