///<reference path='d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='d.ts\angularfire.d.ts' />
///<reference path='d.ts\flashcards.d.ts' />

var app = angular.module('flashcardsApp', ['ngRoute', 'ngAnimate', "firebase"]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html', 
            controller: 'profileCtrl',
            resolve: {
                app: ['$q','$firebaseSimpleLogin', function ($q: ng.IQService, FirebaseSimpleLogin) { 
                    var deferred = $q.defer();

                    new FirebaseSimpleLogin(new Firebase('https://codeneric.firebaseio.com/')).$getCurrentUser().then((user) => {
                        if (user) {
                            console.log("getCurrentUser successfully resolved");
                            deferred.resolve();
                        }
                            
                        else {
                            console.log("getCurrentUser not resolved");
                            deferred.reject();    
                        }
                                                 
                    }); 
                    return deferred.promise
                }]
            }
        })
        .when('/lessons/new', {
            templateUrl: 'views/newLessonForm.html',
            controller: 'newLessonCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(["$rootScope", "$location", (root: ng.IRootScopeService, location: ng.ILocationService) => {   
  
    root.$on("$routeChangeError", (e, cur, prev, rejection) => {        
        location.path("/login");       
    });
    root.$on("$firebaseSimpleLogin:login", () => {
        console.log("$firebaseSimpleLogin:login fired");     
       
    });
    root.$on("$firebaseSimpleLogin:logout", () => {
        console.log("$firebaseSimpleLogin:logout fired"); 
        location.path("/login");        
    });
}]);


class Master {
    static dbUrl = 'https://codeneric.firebaseio.com/';
    static $inject = ["$scope", "$firebaseSimpleLogin", "$firebase", "$location"];

    public auth: IAuthReference;
    public fb: IReference;
    constructor(public scope: ng.IScope, SimpleLogin?: IFirebaseSimpleLoginService, firebase?: IFirebaseService, public $location?: ng.ILocationService) {
        scope['self'] = this;
        if (SimpleLogin) {
            this.auth = SimpleLogin(new Firebase(Master.dbUrl));
        }
    }

}


