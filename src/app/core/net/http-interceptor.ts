import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

    constructor(private injector: Injector) {
        console.log('HttpInterceptors constructor');
    }

    private goLogin() {
        this.injector.get(Router).navigate(['passport/login']);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('HttpInterceptors intercept');
        req = req.clone({
            withCredentials: true
        });

        if ($.cookie('webToken')) {
            req = req.clone({
                headers: req.headers.set('X-Session-Token', $.cookie('webToken')),
            });
        }

        return next.handle(req)
            .do(res => {
                console.log('HttpInterceptors success',res);

            }, err => {
                console.log('HttpInterceptors error',err);
                switch (err['status']) {
                    case 401:
                    case 403:
                        console.log('403!');
                        break;
                    case 404:
                        console.log('404!');
                        break;
                    case 901:
                        console.log('该用户已在其它地点登录 901');
                        this.goLogin();
                        break;
                    case 900:
                        console.log('登录超时，请重新登录 900 ');
                        this.goLogin();
                        break;
                }
            });
    }
}
