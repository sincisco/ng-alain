import {Inject, Injectable} from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import {SessionService} from '../session.service';
import {Observable} from 'rxjs/Observable';
import {_HttpClient} from '@microon/theme';
import {DA_SERVICE_TOKEN, TokenService} from '@microon/auth';
import {environment} from 'environments/environment';


@Injectable()
export class LoginGuard implements CanActivate {

    private url = `${environment.SERVICE_URL}curUser`;

    constructor(private router: Router,
                private sessionService: SessionService,
                private http: _HttpClient,
                @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService) {
    }

    private _getCurUser(): Observable<any> {
        return this.http.get(this.url);
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const session = this.sessionService;
        if (session.isLoggedIn) {
            // login in;
            return true;
        } else if (session.canRetry) {
            // refresh browser;
            return new Promise((resolve, reject) => {
                this._getCurUser()
                    .subscribe(data => {
                        session.parseData(data);
                        resolve(true);
                    }, (err) => {
                        // Store the attempted URL for redirecting
                        session.redirect = state.url;

                        this.router.navigate([session.login_url]);
                        resolve(false);
                    });
            });
        } else {
            // Store the attempted URL for redirecting
            session.redirect = state.url;

            this.router.navigate([session.login_url]);
            return false;
        }
    }

}
