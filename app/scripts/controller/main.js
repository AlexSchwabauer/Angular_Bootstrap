///<reference path='..\app.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Add this to index.html
//  <script src="scripts/controller/sample.js"></script>
//app.controller('SampleCtrl', SampleCtrl);
var MainCtrl = (function (_super) {
    __extends(MainCtrl, _super);
    function MainCtrl(s, l, fb, sl) {
        _super.call(this, s, l, fb, sl);
        var tabs = ["home", "contact"]
    }
    MainCtrl.prototype.login = function (provider) {
        this.auth.$login(provider).then(function () {
            // this.$location.path("/profile");
        });
    };
    return MainCtrl;
})(Master);
