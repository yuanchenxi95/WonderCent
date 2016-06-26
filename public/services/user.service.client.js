/*
 * Contains API for accessing user data: CRUD operations
 */
(function() {
    angular
        .module("WonderCentApp")
        .factory("UserService", UserService); // $scope is a service, $location, $routeParams are all services. They allow for dependency injections

    function UserService($http) {

        var api = {
            createUser            : createUser,
            findUserById          : findUserById,
            findUserByUsername    : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUserPassword    : updateUserPassword,
            updateUserFollowing   : updateUserFollowing,
            login                 : login,
            register              : register,
            logOut                : logOut,
            checkLoggedIn         : checkLoggedIn
        };
        return api;

        /**
         * C: Adds new user parameter instance to the local users array.
         * @param user - the user
         */
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        /**
         * R: the user with the given _id in the local users array
         * @param {number} userId
         * @returns the user with the _id === userID OR null if DNE
         */
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        /**
         * R: the user with the given username in the local users array
         * @param {string} username
         * @returns the users with the same username OR null if DNE
         */
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        /**
         * R: the user with the given username and password pair in the local users array
         * @param {string} username
         * @param {string} password
         * @returns the user with the username and password pair
         */
        function findUserByCredentials(username, password) {
            // Don't really need the "http://localhost:3000" part bellow:
            // var url = "http://localhost:3000/api/user?username=" + username + "&password=" + password;
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url); // returns a promise
        }

        function updateUserPassword(userId, newPassword) {
            var url = "/api/user/password";
            var body = {
                password: newPassword
            }
            return $http.put(url, body);
        }

        function updateUserFollowing(userId, newFollow) {

        }

        /**
         * D: Deletes the user with _id === userId parameter
         * @param {number} userId - user to delete
         * @returns {boolean} true if the deletion was successful
         */
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url); // returns a promise
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            // Use https if you want secure posts. Encrypted packages is also 2 times as big as normal packages.
            return $http.post(url, user);
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }

        function logOut() {
            var url = "/api/logout";
            return $http.post(url);
        }

        function checkLoggedIn() {
            var url = "/api/loggedin";
            return $http.get(url);
        }
   }
})();