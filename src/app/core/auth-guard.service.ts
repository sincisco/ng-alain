import {Injectable} from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
    CanLoad, Route
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '@core/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router,
                private session: SessionService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.session.isLoggedIn) {
            return this.checkPermission();
        }
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkPermission();
    }



    /**
     * 判断当前用户是否为授权用户
     * */
    checkPermission(): boolean {
        // TODO: 将任务代理给AuthService执行
        return true;
    }

}
