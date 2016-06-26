/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function() {
    angular
        .module("WonderCentApp")
        .controller("SearchController", SearchController);

    // View model design pattern
    function SearchController($location, $rootScope) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;

        function init() {
            vm.user = $rootScope.currentUser;
        }

        init();

        vm.searchJob = searchJob;

        function searchJob() {
            $location.url("/search/" + vm.searchTerm);
        }

    }
})();