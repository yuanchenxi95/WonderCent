/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("NewJobController", NewJobController);

    // View model design pattern
    function NewJobController($location, $rootScope, JobService) {
        vm = this;

        vm.createJob = createJob;
        vm.deleteJob = deleteJob;

        function init() {
            var user = $rootScope.user;
        }


        init();

        function createJob() {

            delete vm.error;
            delete vm.success;


            if (vm.newJob.name === "" || vm.newJob.name === null || !vm.newJob.name) {
                vm.error = "name cannot be empty";
            } else {


                var newJob = {
                    price: vm.newJob.price,
                    name: vm.newJob.name,
                    description: vm.newJob.description,
                };

                JobService
                    .createJob(newJob)
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