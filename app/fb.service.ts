import { Injectable } from "angular2/core";
import { Http } from "angular2/http";

@Injectable()
export class FirebaseService {

    constructor(private _http: Http) {

    }
    setUser(fname: string, lname: string) {
        var BASE_URL = "https://zebraz.firebaseio.com/user.json";
        const body = JSON.stringify({
            fname: fname, lname: lname
        });
        return this._http.put(BASE_URL, body)
        .map(response => response.json());
    }
    getUser() {
        var BASE_URL = "https://zebraz.firebaseio.com/user.json";
        return this._http.get(BASE_URL)
        .map(response => response.json());
    }
}