///<reference path='..\d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='..\d.ts\angularfire.d.ts' />
///<reference path='..\d.ts\flashcards.d.ts' />


class LoginCtrl {
    static $inject = ["$scope", "$firebase", "$firebaseSimpleLogin", "$location"];
   
    public auth: IAuthReference;

    constructor(public scope: ng.IScope, public fb:IFirebaseService, SimpleLogin?: IFirebaseSimpleLoginService, public $location?: ng.ILocationService) {
        scope['self'] = this;
        if (SimpleLogin)
            this.auth = SimpleLogin(new Firebase('https://codeneric.firebaseio.com/'));       
        
    }

    public login(provider: string) {
        this.auth.$login(provider).then((user) => { 
            if (user) {
                console.log(user);
                this.fb(new Firebase('https://codeneric.firebaseio.com/')).$child("user").$child(user.uid).$set({ displayName: user.displayName });
                this.$location.path("/profile");
            }
        });
    }

  
}