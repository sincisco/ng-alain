import {Inject, Injectable} from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import {SessionService} from './session.service';
import {Observable} from 'rxjs/Observable';
import {_HttpClient, MenuService} from '@microon/theme';
import {DA_SERVICE_TOKEN, TokenService} from '@microon/auth';
import {environment} from '@env/environment';


@Injectable()
export class LoginGuard implements CanActivate {

    private url = `${environment.SERVICE_URL}menu/menu/curUser`;

    constructor(private router: Router,
                private sessionService: SessionService,
                private http: _HttpClient,
                @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
                private menu: MenuService) {
    }

    private _getCurUser(): Observable<any> {
        return this.http.get(this.url);
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        var tokenModel = this.tokenService.get();
        if (this.sessionService.isLoggedIn) {
            // login in;
            return true;
        } else if (tokenModel && tokenModel.token) {
            // refresh browser;
            return new Promise((resolve, reject) => {
                this._getCurUser()
                    .subscribe(data => {
                        console.log('authService.getCurUser next');
                        this.sessionService.parseData(data);
                        resolve(true);
                    }, (err) => {
                        console.log('authService.getCurUser error');
                        this.router.navigate(['/passport/login']);
                        resolve(false);
                    }, () => {
                        console.log('authService.getCurUser complete');
                        this.tokenService.redirect = state.url;
                        this.router.navigate(['/passport/login']);
                        resolve(false);
                    });
            });
        } else {
            // Store the attempted URL for redirecting
            this.tokenService.redirect = state.url;

            this.router.navigate(['/passport/login']);
            return false;
        }
    }

}
