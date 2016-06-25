(function() {
    angular
        .module("WonderCentApp")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(email, password, passwordVerify) {
            // password validation
            if (password !== passwordVerify) {
                vm.error = "Passwords do not match!";
                return;
            }

            var newUser = {};
            newUser.email = email;
            newUser.password = password;
            UserService
                .register(newUser)
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

            // Old way
            // Unique email validation in the server side
            // UserService
            //     .createUser(newUser)
            //     .then(
            //         function(response) {
            //             $location.url("/user/" + response.data._id);
            //         },
            //         function(error) {
            //             vm.error = error.data;
            //         }
            //     );
        }
    }
})();