/**
 * Created by ChenxiYuan on 6/26/16.
 */
(function () {
    angular
        .module("WonderCentApp")
        .controller("PublicProfileController", PublicProfileController);

    // View model design pattern
    function PublicProfileController($location, $routeParams, $rootScope, UserService, ProfileService) {
        // $location allows you to programmatically change the url: allows read or set the current url.
        var vm = this;
        vm.follow = follow;

        function init() {
            vm.user = $rootScope.currentUser;
            vm.profileUserId = $routeParams.userId;

            vm.alreadyFollow = false;


            if (vm.user == undefined) {
                vm.alreadyFollow = true;

            } else {

                for (var i in vm.user._followingUsers) {
                    if (vm.user._followingUsers[i] === vm.profileUserId) {
                        vm.alreadyFollow = true;
                    }
                }
                
                if (vm.user._id === vm.profileUserId) {
                    vm.alreadyFollow = true;
                }
            }

            ProfileService
                .findProfileById(vm.profileUserId)
                .then(
                    function (response) {
                        vm.success = "Successfully followed";
                        vm.profile = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        init();

        function follow() {
            UserService
                .addFollowingUser(vm.profileUserId)
                .then(
                    function (response) {
                        vm.alreadyFollow = true;
                    },
                    function (error) {
                        vm.error = error;
                    }
                )
        }

    }
})();