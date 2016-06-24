/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function(userModel) {

    var user = userModel.getMongooseModel();

    var api = {
        createJobRole: createJobRole,
        getJobRoleFromUser: getJobRoleFromUser,
        updateJobRole: updateJobRole,
        deleteJobRole: deleteJobRole
    };

    return api;

};