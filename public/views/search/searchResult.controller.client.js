/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function() {
    angular
        .module("WonderCentApp")
        .controller("SearchResultController", SearchResultController);

    // View model design pattern
    function SearchResultController($location, $routeParams, JobService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        vm.searchJob = searchJob;

        function init() {
            vm.searchTerm = $routeParams.query;
            searchJob();
        }

        init();

        function searchJob() {
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