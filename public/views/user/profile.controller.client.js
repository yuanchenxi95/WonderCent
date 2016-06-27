(function () {
    angular
        .module("WonderCentApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $rootScope, $location, UserService, ProfileService) {

        var vm = this;
        // put all event handlers at the top, just like variables
        vm.updatePassword = updatePassword;
        vm.updateProfile = updateProfile;
        vm.unregister = unregister;
        vm.logOut = logOut;

        vm.genderList = ['MALE', 'FEMALE', 'NOT_SPECIFIED'];

        var id = $rootScope.currentUser._id;

        // execute on load time.
        function init() {
            vm.user = $rootScope.currentUser;

            vm.followingUsers = [];
            if (vm.user) {
                for (var i in vm.user._followingUsers) {
                    ProfileService
                        .findProfileById(vm.user._followingUsers[i])
                        .then(
                            function (profile) {
                                vm.followingUsers.push(profile);
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
            }
        }

        init();

        function updatePassword(valid) {

            if (!valid) {
                return;
            }

            if (vm.password !== vm.passwordAgain) {
                vm.isPasswordMatched = false;
                return;
            } else {
                vm.isPasswordMatched = true;
            }


            UserService
                .updateUserPassword(id, vm.password)
                .then(
                    function (response) {
                        vm.error = null;
                        vm.success = "User's password information successfully updated!";
                    },
                    function (error) {
                        vm.success = null;
                        vm.error = error.data;
                    });
        }

        function updateProfile(valid) {
            if (!valid) {
                return;
            }

            ProfileService
                .updateProfile(id, vm.user.profile)
                .then(
                    function (response) {
                        vm.error = null;
                        vm.success = "User and Profile information successfully updated!";
                    },
                    function (error) {
                        vm.success = null;
                        vm.error = error.data;
                    });
        }

        function logOut() {
            $rootScope.currentUser = null;
            UserService
                .logOut()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }
})();