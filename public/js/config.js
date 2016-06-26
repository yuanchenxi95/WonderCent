(function() {
    angular
        .module("WonderCentApp")
        .config(Config);

    function Config($routeProvider) {

        // $q: allows to explicitly resolve/reject promises.
        // $timeout:
        // $http:
        // $location:
        // $rootScope:
        var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope, UserService) {

            var deferred = $q.defer();

            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if (user === '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url('/');
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(error) {
                        deferred.reject();
                        $location.url('/');
                    }
                );

            return deferred.promise;
        };

        var checkLoggedinAcceptGuest = function($q, $timeout, $http, $location, $rootScope, UserService) {

            var deferred = $q.defer();

            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if (user === '0') {
                            $rootScope.currentUser = null;
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(error) {
                        deferred.reject();
                        $location.url('/');
                    }
                );

            return deferred.promise;
        };

        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", { // TODO Check it
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
                // this might be a list of multiple checks, example: check logged in..., then check user role.
            })
            .when("/public/profile/:userId", {
                templateUrl: "views/user/publicProfile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedinAcceptGuest
                }
            })
            ////////////////////////////////////
            // jobs
            .when("/user/jobs", {
                templateUrl: "views/jobs/userJobs.view.client.html",
                controller: "UserJobsController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/job/new", {
                templateUrl: "views/jobs/newJob.view.client.html",
                controller: "NewJobController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/job/jobICreated/edit/:jobId", {
                templateUrl: "views/jobs/editJob.view.client.html",
                controller: "EditJobController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/job/:jobId", {
                templateUrl: "views/jobs/viewJob.view.client.html",
                controller: "ViewJobController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/search/:query", {
                templateUrl: "views/search/searchResult.view.client.html",
                controller: "SearchResultController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedinAcceptGuest
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedinAcceptGuest
                }
            })
            .when("/search/:query/job/:jobId", {
                templateUrl: "views/jobs/viewJob.view.client.html",
                controller: "ViewJobController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();