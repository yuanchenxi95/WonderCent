/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("EditJobApplicantsController", EditJobApplicantsController);

    // View model design pattern
    function EditJobApplicantsController($location, $rootScope, JobService, ProfileService, UserService, $routeParams) {
        vm = this;

        vm.jobId = $routeParams.jobId;
        vm.goBackToJobEdit = goBackToJobEdit;
        vm.chooseThisCandidate = chooseThisCandidate;

        function init() {
            var user = $rootScope.user;

            vm.applicants = [];
            vm.employee;

            // load vm.currentJob
            JobService
                .findJobById(vm.jobId)
                .then(
                    function (response) {
                        vm.currentJob = response.data;
                        return response;
                    },
                    function (error) {
                        vm.error = error;
                    }
                )
                .then(
                    function (response) {
                        if (vm.currentJob._employeeUser != undefined) {
                            ProfileService
                                .findProfileById(vm.currentJob._employeeUser)
                                .then(
                                    function (response) {
                                        var tempProfile = response.data;
                                        if (!tempProfile) {
                                            tempProfile.firstName = "Anonymous";
                                            tempProfile.lastName = "";
                                        }
                                        vm.employee = {
                                            profile: tempProfile,
                                            _userId: vm.currentJob._employeeUser
                                        }
                                    },
                                    function (error) {
                                        vm.error = error.data;
                                    }
                                );

                        }

                        if (vm.currentJob._requestedUsers != undefined) {
                            for (var i in vm.currentJob._requestedUsers) {
                                ProfileService
                                    .findProfileById(vm.currentJob._requestedUsers[i])
                                    .then(
                                        function (response) {
                                            var tempProfile = response.data;
                                            if (!tempProfile) {
                                                tempProfile.firstName = "Anonymous";
                                                tempProfile.lastName = "";
                                            }
                                            vm.applicants.push(tempProfile);
                                        },
                                        function (error) {
                                            vm.error = error.data;
                                        }
                                    )
                            }
                        }

                    },
                    function (error) {

                    }
                );
        }


        init();

        function chooseThisCandidate(candidateId) {

                JobService
                    .chooseCandidate(vm.currentJob._id, candidateId)
                    .then(
                        function (response) {
                            vm.success = "succeeded";
                            init();
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );



        }

        function goBackToJobEdit() {
            $location.url("/user/job/jobICreated/edit/" + vm.jobId);
        }
    }
})();