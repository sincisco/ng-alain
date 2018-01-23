import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {SERVERAPI} from '../../../core/constant';
import {_HttpClient} from '@microon/theme';


@Injectable()
export class UserService {
    private userUrl = SERVERAPI + 'base/v1';
    private apiUrl = SERVERAPI + 'webApi/page';
    private roleUrl = SERVERAPI + 'base/v1';

    constructor(private http: _HttpClient) {
    }

    getUsers(params) {
        console.log('getUsers');
        return this.http.get(this.userUrl + '/user', {params: params});
    }

    //获取所有角色
    getRoles() {
        return this.http.get(this.roleUrl + '/role');
    }
}
