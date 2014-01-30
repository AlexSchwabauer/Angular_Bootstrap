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
var profileCtrl = (function (_super) {
    __extends(profileCtrl, _super);
    function profileCtrl(s, sl, fb, l) {
        _super.call(this, s, sl, fb, l);
        this.tabs = [""];
    }
    return profileCtrl;
})(Master);
