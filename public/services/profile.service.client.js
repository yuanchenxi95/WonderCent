/*
 * Contains API for accessing user data: CRUD operations
 */
(function() {
    angular
        .module("WonderCentApp")
        .factory("ProfileService", ProfileService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function ProfileService($http) {

        var api = {
            findProfileByEmail    : findProfileByEmail,
            findProfileById       : findProfileById,
            updateProfile         : updateProfile
        };
        return api;

        function findProfileByEmail(userEmail) {
            var url = "/api/user/profile/" + userEmail;
            return $http.get(url);
        }

        function findProfileById(userId) {
            var url = "/api/user/profile?userId=" + userId;
            return $http.get(url);
        }

        function updateProfile(userId, newProfile) {
            var url = "/api/user/profile/";
            var body = {
                profile: newProfile
            };
            return $http.put(url, newProfile); // returns a promise
        }
    }
})();