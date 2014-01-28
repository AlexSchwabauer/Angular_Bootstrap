///<reference path='..\app.ts' />

// Add this to index.html
//  <script src="scripts/controller/sample.js"></script>

//app.controller('SampleCtrl', SampleCtrl); 


declare var auth;

class newLessonCtrl extends Master { 
   
    constructor(s,auth, fb) {
        super(s, auth, fb);

        this.auth.$getCurrentUser().then((user) => {
            this.fb = fb(new Firebase(Master.dbUrl + "/user/" + user.uid));         
        });

    }
        
    public newLessonData:fc.ILesson;   

    public saveLesson() {
        this.fb.$child("lessons").$add(this.newLessonData);
        
    }

}
    
