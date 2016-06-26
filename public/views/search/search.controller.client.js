/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function() {
    angular
        .module("WonderCentApp")
        .controller("SearchController", SearchController);

    // View model design pattern
    function SearchController($location) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;


        vm.searchJob = searchJob;

        function searchJob(searchTerm) {
            $location.url("/search/" + searchTerm);
        }

    }
})();