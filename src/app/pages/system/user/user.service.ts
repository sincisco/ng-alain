import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {SERVERAPI} from "../../../core/constant";
import {_HttpClient} from '@microon/theme';


@Injectable()
export class UserService{
  //private userUrl = "api/users";
  private userUrl = SERVERAPI+"base/v1"
  private apiUrl = SERVERAPI+"webApi/page";
  private roleUrl = SERVERAPI+"base/v1";

  constructor(private http:_HttpClient){
        console.log("UserService constructor:",http===$.temp);
  }

  getUsers(params){
      console.log("getUsers");
    return this.http.get(this.userUrl+"/user",{params:params});
      /*.pipe(
        tap(_=>{console.log("获取用户")}),
        catchError(this.handleError<any>("getUsers"))
      )*/
  }

  addUsers(params){
    return this.http.post(this.userUrl+"/user",params)
      .pipe(
        tap(_=>console.log("添加用户")),
        catchError(this.handleError<any>("addUsers"))
      )
  }

  modUsers(params){
    return this.http.put(this.userUrl+"/user",params)
      .pipe(
        tap(_=>console.log("修改用户")),
        catchError(this.handleError<any>("modUsers"))
      )
  }

  delUser(params){
    return this.http.delete(this.userUrl+"/user",{params:params})
      .pipe(
        tap(_=>console.log("删除用户")),
        catchError(this.handleError<any>("delUser"))
      )
  }

  getApis(){
    return this.http.get(this.apiUrl)
      .pipe(
        tap(_=>console.log("获取服务列表")),
        catchError(this.handleError<any>("getApis"))
      )
  }

  //获取用户详情
  getDetailByUserNo(no){
    return this.http.get(this.roleUrl+`/user/${no}`)
      .pipe(
        tap(_=>console.log("通过用户编号获取用户详细信息")),
        catchError(this.handleError<any>("getCatalogByRoleId"))
      )
  }

  //获取所有角色
  getRoles(){
    return this.http.get(this.roleUrl+"/role").pipe(
        tap(_=>console.log("大家好！")),
        catchError(this.handleError<any>("getRoles"))
      );
  }
  //根据角色类别获取角色
  getRolesByCatalog(params){
    return this.http.get(this.roleUrl+"/role",{params:params})
      .pipe(
        tap(_=>{console.log("获取角色列表")}),
        catchError(this.handleError<any>("getRoles"))
      )
  }
  //获取角色详情
  getCatalogByRoleId(no){
    return this.http.get(this.roleUrl+`/role/${no}`)
      .pipe(
        tap(_=>console.log("通过角色编号获取角色")),
        catchError(this.handleError<any>("getCatalogByRoleId"))
      )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error("handleError",error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
