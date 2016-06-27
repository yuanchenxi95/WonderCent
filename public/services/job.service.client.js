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
            findJobById: findJobById,
            applyJob: applyJob,
            createJob: createJob,
            updateJob: updateJob,
            deleteJob: deleteJob,
            searchJob: searchJob,
            chooseCandidate: chooseCandidate
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
            };
            return $http.put(url, body);
        }

        function findJobById(jobId) {
            var url = "/api/job/" + jobId;

            return $http.get(url);
        }

        function updateJob(job) {
            var url = "/api/job/update";

            var body = {
                job: job
            };

            return $http.put(url, body);
        }

        function deleteJob(jobId) {
            var url = "/api/job/delete/" + jobId;
            return $http.delete(url);
        }

        function searchJob(searchTerm) {
            var url = "/api/job/search/" + searchTerm;
            return $http.get(url);
        }

        function chooseCandidate(jobId, candidateId) {
            var url = "/api/job/chooseCandidate";
            var body = {
                jobId: jobId,
                candidateId: candidateId
            };

            return $http.put(url, body);

        }
    }
})();