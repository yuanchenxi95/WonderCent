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

        // execute on load time.
        function init() {
            vm.user = $rootScope.currentUser;

            JobService
                .findJobById($routeParams["jobId"])
                .then(
                    function(job) {
                        vm.job = job;
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    }
                );

            findJobsByEmployeeId();
            findJobsByEmployerId();
            findJobsByRequestedUserId();

        }

        init();


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