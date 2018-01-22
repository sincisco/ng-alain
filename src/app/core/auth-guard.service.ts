import {Injectable} from "@angular/core";
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
    CanLoad, Route
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkLogin();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let url: string = state.url;
        return this.checkLogin(url) && this.checkPermission();
    }

    /**
     * 判断用户是否登陆
     * */
    checkLogin(url?: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(["/passport/login"]);
        return false;
    }

    /**
     * 判断当前用户是否为授权用户
     * */
    checkPermission(): boolean {
        // TODO: 将任务代理给AuthService执行
        return true;
    }

}
