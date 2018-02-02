import {Injectable} from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
    CanLoad, Route
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from 'app/core/session.service';
import { AuthService } from '@core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router,
                private authService:AuthService,
                private session: SessionService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log("AuthGuard","canActivate");
        if (this.session.isLoggedIn) {
            return this.checkPermission(state.url);
        }
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log("AuthGuard","canActivateChild");
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): boolean {
        console.log("AuthGuard","canActivateChild");
        const url = `/${route.path}`;
        return this.checkPermission(url);
    }


    /**
     * 判断当前用户是否为授权用户
     * */
    checkPermission(url?: string): boolean {
        // TODO: 将任务代理给AuthService执行
        return this.authService.checkPermission(url);
    }

}
