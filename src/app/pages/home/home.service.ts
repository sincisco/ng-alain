import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from '@env/environment';

@Injectable()
export class HomeService {
  private SERVERAPI = `${environment.SERVICE_URL}`;
  private costUrl = this.SERVERAPI + `usrApp`;

  constructor(private http: HttpClient) {
  }

    // 获取用户详情
    getDetailByUserNo(no) {
        return this.http.get(this.SERVERAPI + "base/v1" + `/user/${no}`)
            .pipe(
            );
    }

    // 获得未审核应用列表
    getPage(params): Observable<any> {
        return this.http.get<any>(this.costUrl + "/page", {
            params: params
        }).pipe(
        );
    }

}
