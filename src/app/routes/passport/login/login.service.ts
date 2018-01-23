import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {SERVERAPI} from "@core/constant";

@Injectable()
export class LoginService {

  private url = SERVERAPI + "login";

  constructor(private http: HttpClient) {
        $.temp=this.http;
  }

  login(params): Observable<any> {
    console.log(this.url);
    return this.http.post(this.url, params).pipe(
      tap(_ => console.log(`登录请求`)),
      catchError(this.handleError("登录请求", {}))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }


}
