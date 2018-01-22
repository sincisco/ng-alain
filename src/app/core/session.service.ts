import {Injectable} from "@angular/core";

@Injectable()
export class SessionService {

  private _session: any;  // TODO: 应该定义为private

  setSession(session: any) {
    this._session = session;
  }

  getUserSession() {
    return this._session;
  }

}

