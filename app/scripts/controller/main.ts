///<reference path='..\app.ts' />

// Add this to index.html
//  <script src="scripts/controller/sample.js"></script>

//app.controller('SampleCtrl', SampleCtrl);


class MainCtrl extends Master {
    public tabs = ["home", "contact"];
       
    constructor(s,l,fb,sl) {
        super(s,l,fb, sl);

        
    }

    public login(provider: string) {
        this.auth.$login(provider).then(() => {
           // this.$location.path("/profile");
        });
    }

}