///<reference path='d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='d.ts\angularfire.d.ts' />
var app = angular.module('flashcardsApp', ['ngRoute', 'ngAnimate', "firebase"]);

app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'MainCtrl'
        }).when('/profile', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);

app.run([
    "$rootScope",
    "$location",
    function (root, location) {
        root.$on("$firebaseSimpleLogin:login", function () {
            location.path("/profile");
        });
        root.$on("$firebaseSimpleLogin:logout", function () {
            location.path("/");
        });
    }
]);

var Master = (function () {
    function Master(scope, $location, firebase, SimpleLogin) {
        this.scope = scope;
        this.$location = $location;
        scope['self'] = this;

        this.fb = firebase(new Firebase('https://codeneric.firebaseio.com/'));
        this.auth = SimpleLogin(new Firebase('https://codeneric.firebaseio.com/'));
        //this.scope.$on("$firebaseSimpleLogin:logout", (e, user) => {
        //    this.$location.path("/");
        //});
        //this.scope.$on("$routeChangeStart", (event, next, current) => {
        //    console.log("ROUTE CHANGES");
        //});
    }
    Master.$inject = ["$scope", "$location", "$firebase", "$firebaseSimpleLogin"];
    return Master;
})();
