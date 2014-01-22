///<reference path='d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='d.ts\angularfire.d.ts' />

var app = angular.module('flashcardsApp', ['ngRoute', 'ngAnimate', "firebase"]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'MainCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(["$rootScope", "$location", (root: ng.IRootScopeService, location: ng.ILocationService) => {
    root.$on("$firebaseSimpleLogin:login", () => {
        location.path("/profile");
    });
    root.$on("$firebaseSimpleLogin:logout", () => {
        location.path("/");
    });
}]);


class Master {
    static $inject = ["$scope","$location", "$firebase", "$firebaseSimpleLogin"];
    public fb: IReference;
    public auth : IAuthReference;

    constructor(public scope: ng.IScope, public $location :ng.ILocationService, firebase: IFirebaseService, SimpleLogin: IFirebaseSimpleLoginService) {
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
}