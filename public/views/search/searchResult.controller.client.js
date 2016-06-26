/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function() {
    angular
        .module("WonderCentApp")
        .controller("SearchResultController", SearchResultController);

    // View model design pattern
    function SearchResultController($location) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;

        vm.search = search;

        function search(searchTerm) {
            $location.url("/search/" + searchTerm);
        }

    }
})();