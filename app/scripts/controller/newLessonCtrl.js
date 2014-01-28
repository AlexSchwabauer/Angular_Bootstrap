var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var newLessonCtrl = (function (_super) {
    __extends(newLessonCtrl, _super);
    function newLessonCtrl(s, auth, fb) {
        _super.call(this, s, auth, fb);

        this.auth.$getCurrentUser().then(function (user) {
            _this.fb = fb(new Firebase(Master.dbUrl + "/user/" + user.uid));
        });
    }
    newLessonCtrl.prototype.saveLesson = function () {
        this.fb.$child("lessons").$add(this.newLessonData);
    };
    return newLessonCtrl;
})(Master);
