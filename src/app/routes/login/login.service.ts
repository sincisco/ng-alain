import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { tap} from "rxjs/operators";
import {environment} from "@env/environment";

@Injectable()
export class LoginAService {

    private url = `${environment.SERVICE_URL}` + "login";

    constructor(private http: HttpClient) {
    }

    login(params): Observable<any> {
        console.log(this.url);
        return this.http.post(this.url, params).pipe(
            tap(data => console.log(`登录请求`)));
    }
}
