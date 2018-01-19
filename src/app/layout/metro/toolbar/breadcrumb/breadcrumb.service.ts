import {Injectable} from "@angular/core";

@Injectable()
export class BreadcrumbService {
  _navs:Array<any>=[];
  constructor() {
  }


  getNavs(){
    return this._navs;
  }


  setNavs(paramArray:Array<any>){
    this._navs=paramArray;
  }
}

