/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("SearchResultController", SearchResultController);

    // View model design pattern
    function SearchResultController($location, $rootScope, $routeParams, JobService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        vm.searchJob = searchJob;

        function init() {
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
                        vm.error = error;
                    }
                );


        }
    }
})();