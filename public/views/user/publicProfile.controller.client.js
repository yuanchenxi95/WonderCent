/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function() {
    angular
        .module("WonderCentApp")
        .controller("PublicProfileController", PublicProfileController);

    // View model design pattern
    function PublicProfileController($location, $routeParams, $rootScope, JobService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;



    }
})();