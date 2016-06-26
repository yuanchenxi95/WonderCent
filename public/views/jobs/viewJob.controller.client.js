(function() {
    angular
        .module("WonderCentApp")
        .controller("ViewJobController", ViewJobController);

    // View model design pattern
    function ViewJobController($location, $routeParams, $rootScope, JobService, UserService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        // vm.findJobsByEmployeeId = findJobsByEmployeeId;
        // vm.findJobsByEmployerId = findJobsByEmployerId;
        // vm.findJobsByRequestedUserId = findJobsByRequestedUserId;
        vm.canRequestJob = canRequestJob;
        vm.applyForJob = applyForJob;

        // execute on load time.
        function init() {
            vm.user = $rootScope.currentUser;

            if (vm.user) {
                vm.loggedIn = true;
                console.log(vm.user);
            } else {
                vm.loggedIn = false;
            }

            // Back button url:
            if ($routeParams["query"]) {
                vm.backURL = "#search/" + $routeParams["query"];
            } else if (vm.loggedIn) {
                vm.backURL = "#user/jobs";
            } else {
                vm.backURL = "#/login"
            }

            JobService
                .findJobById($routeParams["jobId"])
                .then(
                    function(response) {
                        vm.job = response.data;
                        console.log(vm.job);
                        findUsersByRequestedUserID();
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );
        }

        init();

        function findUsersByRequestedUserID() {
            vm.applicants = [];
            for (var i in vm.job._requestedUsers) {
                UserService
                    .findUserById(vm.job._requestedUsers[i])
                    .then(
                        function(user) {
                            applicants.push(user);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function canRequestJob() {
            if (!vm.loggedIn) {
                return true; // You can, but you need to log in first.
            }

            for (var i in vm.user.jobRoles) {
                if (vm.user.jobRoles[i]._job === vm.job._id) {
                    return false;
                }
            }
            return true;
        }

        function applyForJob() {
            if (vm.loggedIn) {
                JobService
                    .applyJob(vm.job._id)
                    .then(
                        function(response) {
                            vm.hasApplied = true;
                            vm.applicants.push(vm.user);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
        }
    }
})();