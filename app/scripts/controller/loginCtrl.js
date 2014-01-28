///<reference path='..\d.ts\DefinitelyTyped\angularjs\angular.d.ts' />
///<reference path='..\d.ts\angularfire.d.ts' />
///<reference path='..\d.ts\flashcards.d.ts' />
var LoginCtrl = (function () {
    function LoginCtrl(scope, fb, SimpleLogin, $location) {
        this.scope = scope;
        this.fb = fb;
        this.$location = $location;
        scope['self'] = this;
        if (SimpleLogin)
            this.auth = SimpleLogin(new Firebase('https://codeneric.firebaseio.com/'));
    }
    LoginCtrl.prototype.login = function (provider) {
        var _this = this;
        this.auth.$login(provider).then(function (user) {
            if (user) {
                console.log(user);
                _this.fb(new Firebase('https://codeneric.firebaseio.com/')).$child("user").$child(user.uid).$set({ displayName: user.displayName });
                _this.$location.path("/profile");
            }
        });
    };
    LoginCtrl.$inject = ["$scope", "$firebase", "$firebaseSimpleLogin", "$location"];
    return LoginCtrl;
})();
