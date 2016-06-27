/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("SearchResultController", SearchResultController);

    // View model design pattern
    function SearchResultController($location, $rootScope, $routeParams, JobService, ProfileService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        vm.searchJob = searchJob;

        function init() {
            vm.previousSearch = angular.copy($routeParams.query);
            vm.searchTerm = $routeParams.query;
            vm.user = $rootScope.currentUser;
            searchJob();
        }

        init();

        function searchJob() {

            if (vm.searchTerm === "" || !vm.searchTerm) {
                return;
            }

            if (vm.searchTerm != $routeParams.query) {
                $location.url("/search/" + vm.searchTerm);
                return;
            }
            JobService
                .searchJob(vm.searchTerm)
                .then(
                    function (response) {
                        vm.jobs = response.data;
                    },
                    function (error) {
                        vm.success = null;
                        vm.error = error;
                    }
                );

            ProfileService
                .findProfileByKeyWord(vm.searchTerm)
                .then(
                    function(response) {
                        vm.profiles = response.data;
                        console.log(vm.profiles);
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error;
                    }
                );

        }
    }
})();