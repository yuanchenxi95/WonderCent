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
            updateProfile         : updateProfile,
            findProfileByKeyWord  : findProfileByKeyWord
        };
        return api;

        function findProfileByEmail(userEmail) {
            var url = "/api/user/profile/" + userEmail;
            return $http.get(url);
        }

        function findProfileById(userId) {
            var url = "/api/user/profile/" + userId;
            return $http.get(url);
        }

        function updateProfile(userId, newProfile) {
            var url = "/api/user/profile/";
            var body = {
                profile: newProfile
            };
            console.log(newProfile);
            return $http.put(url, body); // returns a promise
        }

        function findProfileByKeyWord(keyword) {
            var url = "/api/user/profile/search/" + keyword;
            return $http.get(url);
        }

    }
})();