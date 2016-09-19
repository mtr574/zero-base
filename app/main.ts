import { bootstrap }  from "angular2/platform/browser";
import { Component } from "angular2/core";
import { JSONP_PROVIDERS, Jsonp } from "angular2/http";
import { Observable } from "rxjs";
import { ApiResponse, Submission } from "./reddit";
import "rxjs/add/operator/map";
import { TemplateCompiler } from "angular2/src/compiler/template_compiler";
import { HTTP_PROVIDERS } from "angular2/http";
import { FirebaseService } from "./fb.service";

@Component({
    selector: "app",
    template: '<button (click)="onGetUser()">Get User</button> Res: {{ response }}',
    // templateUrl: "templates/app.html",
    providers: [FirebaseService]
    // providers: [JSONP_PROVIDERS]
})
class App {
    response: string;

    constructor(private _firebaseService: FirebaseService) {}

    onGetUser() {
        console.log("getting data");
        return this._firebaseService.getUser().subscribe(
            user => this.response = JSON.stringify(user),
            error => console.log("onGetUser: " + error)
        );
    }

    // private feedData: Observable<Submission[]>;
    // x: any;

    // constructor(private jsonp: Jsonp, private _templateCompiler: TemplateCompiler) { 
    //     this._templateCompiler.clearCache();
    // }

    // ngOnInit() {
    //     this.displaySubreddit("movies");
    // }

    // private displaySubreddit(subreddit: string) {
    //     var JSON_URL = "http://reddit.com/r/movies.json?jsonp=JSONP_CALLBACK";
    //     this.feedData = this.jsonp
    //         .get(JSON_URL)
    //         .map(res => (res.json() as ApiResponse).data.children.map(child => child.data));
    // }
}

bootstrap(App, [HTTP_PROVIDERS]);
