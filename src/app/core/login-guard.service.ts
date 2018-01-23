import {Injectable} from "@angular/core";
import {
  CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs/Observable";
import {MenuService} from '@microon/theme';


@Injectable()
export class LoginGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionService,
              private menu: MenuService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.authService.isLoggedIn) {
      // login in;
      return true;
    } else if ($.cookie("webToken")) {
      // refresh browser;
      return new Promise((resolve, reject) => {
        this.authService.getCurUser()
          .subscribe(data => {
              if (data.retCode !== '00') {
                  this.router.navigate(["passport/login"]);
                  resolve(false);
              } else {
                  this.sessionService.parseData(data);
                  resolve(true);
              }
          },(err)=>{
              console.log("this.authService.getCurUser error");
              this.router.navigate(["passport/login"]);
              resolve(false);
          });
      });
    } else {
      this.router.navigate(["passport/login"]);
      return false;
    }
  }

}
