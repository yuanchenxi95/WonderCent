/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (userModel) {

    var User = userModel.getMongooseModel();

    var api = {
        addJobRole: addJobRole,
        updateJobRole: updateJobRole,
        deleteJobRole: deleteJobRole,
        deleteJobRoleByJobId: deleteJobRoleByJobId
    };

    return api;

    function addJobRole(jobRole, userId) {
        return User
            .findOne({_id: userId})
            .then(function(user) {
                user.jobRoles.push(jobRole);
                return user.save();
            });

    }

    function updateJobRole(jobRoleId, jobRole, userId) {

        return User
            .findOne({_id: userId})
            .then(function(user) {
                var jobRoles = user.jobRoles;

                for (var i in jobRoles) {
                    if (jobRoles[i]._id === jobRoleId) {
                        jobRoles.splice(i, 1);
                        jobRoles.splice(i, 0, jobRole);

                        // save to data base
                        return user.save();
                    }
                }
            });

    }

    function deleteJobRole(jobRoleId, userId) {

        return User
            .findOne({_id: userId})
            .then(function(user) {
                for (var i in user.jobRoles) {
                    if (user.jobRoles[i]._id === jobRoleId) {
                        user.jobRoles.splice(i, 1);
                        // save to data base
                        return user.save();
                    }
                }
            });

    }

    function deleteJobRoleByJobId(jobId, userId) {

        return User
            .findOne({_id: userId})
            .then(function(user) {
                for (var i in user.jobRoles) {
                    if (user.jobRoles[i]._job === jobId) {
                        user.jobRoles.splice(i, 1);
                        // save to data base
                        return user.save();
                    }
                }
            });

    }

};