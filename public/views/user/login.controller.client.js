(function() {
    angular
        .module("WonderCentApp")
        .controller("LoginController", LoginController);

    // View model design pattern
    function LoginController($location, $rootScope, UserService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        vm.login = login;

        function login(email, password) {
            UserService
                .login(email, password)
                .then(
                    // Success
                    function(response) { // <- using promises
                        var user = response.data;
                        if (user) { // Truthy: model.error has to be there to render
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        } else {
                            // if responded with a null
                            vm.error = "Email and password pair not found!";
                        }
                    },
                    // Error
                    function(error) {
                        vm.error = "User not found!";
                    });

            // Old way, insecure using http.get
            // UserService
            //     .findUserByCredentials(Email, password)

        }
    }
})();