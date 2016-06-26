/*
 * Contains API for accessing user data: CRUD operations
 */
(function() {
    angular
        .module("WonderCentApp")
        .factory("JobService", JobService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function JobService($http) {

        var api = {
            findJobsByEmployeeId: findJobsByEmployeeId,
            findJobsByEmployerId: findJobsByEmployerId,
            findJobsByRequestedUserId: findJobsByRequestedUserId,
            createJob: createJob,
        };
        return api;

        function findJobsByEmployerId(userId) {
            var url = "/api/user/jobs/creatingJobs/" + userId;
            return $http.get(url);
        }

        function findJobsByEmployeeId(userId) {
            var url = "/api/user/jobs/acceptorJobs/"  + userId;
            return $http.get(url);
        }

        function findJobsByRequestedUserId(userId) {
            var url = "/api/user/jobs/pendingJobs/" + userId;
            return $http.get(url);
        }

        function createJob(newJob) {
            var url = "/api/job/create";
            var body = {
                job: newJob
            };
            return $http.post(url, body);
        }

        function applyJob(jobId) {
            var url = "/api/job/apply";
            var body = {
                jobId: jobId
            }
            return $http.put(url, body);
        }

    }
})();