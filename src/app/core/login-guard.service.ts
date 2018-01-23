import {Inject, Injectable} from '@angular/core';
import {
  CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs/Observable";
import {MenuService} from '@microon/theme';
import {DA_SERVICE_TOKEN, TokenService} from '@microon/auth';


@Injectable()
export class LoginGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionService,
              @Inject(DA_SERVICE_TOKEN)private tokenService:TokenService,
              private menu: MenuService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


     var tokenModel=this.tokenService.get();
    if (this.authService.isLoggedIn) {
      // login in;
      return true;
    } else if (tokenModel&&tokenModel.token) {
      // refresh browser;
      return new Promise((resolve, reject) => {
        this.authService.getCurUser()
          .subscribe(data => {
              console.log("authService.getCurUser next");
              this.sessionService.parseData(data);
              resolve(true);
          },(err)=>{
              console.log("authService.getCurUser error");
              this.router.navigate(["/passport/login"]);
              resolve(false);
          },()=>{
              console.log("authService.getCurUser complete");
              this.router.navigate(["/passport/login"]);
              resolve(false);
          });
      });
    } else {
      this.router.navigate(["/passport/login"]);
      return false;
    }
  }

}
