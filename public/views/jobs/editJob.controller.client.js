/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("EditJobController", EditJobController);

    // View model design pattern
    function EditJobController($location, $rootScope, JobService, $routeParams) {
        vm = this;

        vm.jobId = $routeParams.jobId;
        vm.updateJob = updateJob;
        vm.deleteJob = deleteJob;

        function init() {
            var user = $rootScope.user;


            // load vm.currentJob
            JobService
                .getJobById(vm.jobId)
                .then(
                    function (response) {
                        vm.currentJob = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }


        init();

        function updateJob() {

            delete vm.error;
            delete vm.success;


            if (vm.currentJob.name === "" || vm.currentJob.name === null || !vm.currentJob.name) {
                vm.error = "name cannot be empty";
            } else {




                JobService
                    .updateJob(vm.currentJob)
                    .then(
                        function (response) {
                            vm.success = "creation succeeded";
                            goBackToJobList();
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );

            }

        }

        function deleteJob() {
            goBackToJobList();
        }

        function goBackToJobList() {
            $location.url("/user/jobs");
        }
    }
})();