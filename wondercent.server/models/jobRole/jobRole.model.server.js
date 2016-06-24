/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (userModel) {

    var user = userModel.getMongooseModel();

    var api = {
        addJobRole: addJobRole,
        getJobRolesFromUser: getJobRolesFromUser,
        updateJobRole: updateJobRole,
        deleteJobRole: deleteJobRole
    };

    return api;

    function addJobRole(jobRole) {
        return user.jobRoles.push(jobRole);
    }

    function getJobRolesFromUser() {
        return user.jobRoles;
    }

    function updateJobRole(jobRoleId, jobRole) {
        var jobRoles = user.jobRoles;

        for (var i in jobRoles) {
            if (jobRoles[i]._id === jobRoleId) {
                jobRoles.splice(i, 1);
                jobRoles.splice(i, 0, jobRole);

                // save to data base
                user.save();
                return true;
            }
        }
        return false;
    }

    function deleteJobRole(jobRoleId) {
        for (var i in jobRoles) {
            if (jobRoles[i]._id === jobRoleId) {
                jobRoles.splice(i, 1);
                // save to data base
                user.save();
                return true;
            }
        }
        return false;
    }

};