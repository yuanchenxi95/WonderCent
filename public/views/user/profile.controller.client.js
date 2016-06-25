(function() {
    angular
        .module("WonderCentApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $rootScope, $location, UserService) {

        var vm = this;
        // put all event handlers at the top, just like variables
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logOut = logOut;

        var id = $rootScope.currentUser._id;
        
        // execute on load time.
        function init() {
            UserService
                .findUserById(id)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        init();

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.error = null;
                        vm.success = "User successfully updated!"
                    },
                    function(error) {
                        vm.success = null;
                        vm.error = error.data;
                    });
        }

        function logOut() {
            $rootScope.currentUser = null;
            UserService
                .logOut()
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        $location.url("/login");
                    }
                );
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();