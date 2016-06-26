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
        findJobsByJobName: findJobsByJobName,
        findJobsByPriceRange: findJobsByPriceRange,
        findJobsByEmployeeId: findJobsByEmployeeId,
        findJobsByEmployerId: findJobsByEmployerId,
        findJobsByRequestedUserId: findJobsByRequestedUserId,
        updateJob: updateJob,
        deleteJob: deleteJob,
        searchJob: searchJob,
    };

    return api;

    function getMongooseModel() {
        return Job;
    }

    function createJob(job) {
        return Job.create(job);
    }

    function findJobById(jobId) {
        return Job.findOne({_id: jobId});
    }

    function findJobsByJobName(jobName) {
        return Job.find({name: jobName});
    }

    function findJobsByPriceRange(min, max) {
        return Job.find({price: {$lte:10, $gte:100}});
    }
    
    function updateJob(jobId, job) {
        delete job._id;

        return Job.findOneAndUpdate({_id: jobId}, job);
    }

    function deleteJob(jobId) {
        return Job.remove({_id: jobId});
    }

    function searchJob(jobName) {
        return Job.find({name: /jobName/});
    }

    function findJobsByEmployeeId(employeeId) {
        return Job.find({_employeeUser: employeeId});
    }

    function findJobsByEmployerId(employerId) {
        return Job.find({_employerUser: employerId});
    }

    function findJobsByRequestedUserId(reqUserId) {
        return Job.find({_requestedUsers: reqUserId});
    }
    
    


};