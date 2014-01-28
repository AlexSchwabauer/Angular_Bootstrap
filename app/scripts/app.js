///<reference path='d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='d.ts\angularfire.d.ts' />
///<reference path='d.ts\flashcards.d.ts' />
var app = angular.module('flashcardsApp', ['ngRoute', 'ngAnimate', "firebase"]);

app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'profileCtrl',
            resolve: {
                app: [
                    '$q',
                    '$firebaseSimpleLogin',
                    function ($q, FirebaseSimpleLogin) {
                        var deferred = $q.defer();

                        new FirebaseSimpleLogin(new Firebase('https://codeneric.firebaseio.com/')).$getCurrentUser().then(function (user) {
                            if (user) {
                                console.log("getCurrentUser successfully resolved");
                                deferred.resolve();
                            } else {
                                console.log("getCurrentUser not resolved");
                                deferred.reject();
                            }
                        });
                        return deferred.promise;
                    }
                ]
            }
        }).when('/lessons/new', {
            templateUrl: 'views/newLessonForm.html',
            controller: 'newLessonCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);

app.run([
    "$rootScope",
    "$location",
    function (root, location) {
        root.$on("$routeChangeError", function (e, cur, prev, rejection) {
            location.path("/login");
        });
        root.$on("$firebaseSimpleLogin:login", function () {
            console.log("$firebaseSimpleLogin:login fired");
        });
        root.$on("$firebaseSimpleLogin:logout", function () {
            console.log("$firebaseSimpleLogin:logout fired");
            location.path("/login");
        });
    }
]);

var Master = (function () {
    function Master(scope, SimpleLogin, firebase, $location) {
        this.scope = scope;
        this.$location = $location;
        scope['self'] = this;
        if (SimpleLogin) {
            this.auth = SimpleLogin(new Firebase(Master.dbUrl));
        }
    }
    Master.dbUrl = 'https://codeneric.firebaseio.com/';
    Master.$inject = ["$scope", "$firebaseSimpleLogin", "$firebase", "$location"];
    return Master;
})();
