import {Injectable} from "@angular/core";

@Injectable()
export class SessionService {

  session: any;  // TODO: 应该定义为private

  setSession(session: any) {
    this.session = session;
  }

  getUserSession() {
    return this.session;
  }

  getGroupArrayByMenuId(menuId): any[] {
    return [];
  }

}

