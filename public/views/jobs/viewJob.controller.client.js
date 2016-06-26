(function() {
    angular
        .module("WonderCentApp")
        .controller("ViewJobController", ViewJobController);

    // View model design pattern
    function ViewJobController($location, $routeParams, $rootScope, JobService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        // vm.findJobsByEmployeeId = findJobsByEmployeeId;
        // vm.findJobsByEmployerId = findJobsByEmployerId;
        // vm.findJobsByRequestedUserId = findJobsByRequestedUserId;
        vm.isThisJobMyJob = isThisJobMyJob;
        vm.applyForJob = applyForJob;

        // execute on load time.
        function init() {
            vm.user = $rootScope.currentUser;

            if (user) {
                vm.loggedIn = true;
            } else {
                vm.loggedIn = false;
            }

            if ($routeParams["query"]) {
                vm.backURL = "#search/" + $routeParams["query"];
            } else {
                vm.backURL = "#user/jobs";
            }

            JobService
                .findJobById($routeParams["jobId"])
                .then(
                    function(response) {
                        vm.job = response.data;
                        console.log(vm.job);
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );

            vm.applicants = [];
            for (var i in job._requestedUsers) {
                UserService
                    .findUserById(job._requestedUsers[i])
                    .then(
                        function(user) {
                            applicants.push(user);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }

            if (vm.user) {
                findJobsByEmployeeId();
                findJobsByEmployerId();
                findJobsByRequestedUserId();
            }
        }

        init();

        function isThisJobMyJob() {
            for (var i in vm.jobsAsEmployer) {
                if (vm.jobsAsEmployer[i]._id === vm.job._id) {
                    return false;
                }
            }
            return false;
        }

        function findJobsByEmployeeId() {
            JobService
                .findJobsByEmployeeId(vm.user._id)
                .then(
                    function (response) {
                        vm.jobsAsEmployee =  response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        function findJobsByEmployerId() {
            JobService
                .findJobsByEmployerId(vm.user._id)
                .then(
                    function (response) {
                        vm.jobsAsEmployer =  response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        function applyForJob() {
            if (vm.user) {
                JobService
                    .applyJob(jobId)
                    .then(
                        function(response) {
                            vm.hasApplied = true;
                        },
                        function(error) {
                            vm.erro = error.data;
                        }
                    );
            }
        }

        function findJobsByRequestedUserId() {
            JobService
                .findJobsByRequestedUserId(vm.user._id)
                .then(
                    function (response) {
                        vm.jobsAsRequestedUser = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

    }
})();