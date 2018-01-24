import {Injectable} from "@angular/core";
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
    CanLoad, Route
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SessionService} from '@core/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router,
                private session:SessionService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkPermission();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let url: string = state.url;
        if(this.session.isLoggedIn){
            return this.checkPermission();
        }

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
