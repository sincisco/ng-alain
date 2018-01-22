import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {HttpClient} from "@angular/common/http";
import {SERVERAPI} from "./constant";

// TODO: 验证用户是否登录
@Injectable()
export class AuthService {
  private loggedIn: boolean;
  private redirectUrl: string;  // store the URL so we can redirect after logging in


  private url = SERVERAPI + "menu/menu/curUser";

  constructor(private http: HttpClient) {

  }


  getCurUser(): Observable<any> {
    return this.http.get(this.url);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLogin(v: boolean) {
    this.loggedIn = v;
  }

}
