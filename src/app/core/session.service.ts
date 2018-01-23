import {Injectable} from '@angular/core';
import {Session} from '../models/session';
import {OrgGrade} from '../models/orgGrade';
import {MenuService} from '@microon/theme';
import {AuthService} from '@core/auth.service';

@Injectable()
export class SessionService {

    private _inited: boolean = false;
    private _session: Session;  // TODO: 应该定义为private

    constructor(private menuService: MenuService,
                private authService: AuthService) {

    }

    get inited() {
        return this._inited;
    }

    set Session(session: any) {
        this._session = session;
        if (session) {
            this._inited = true;
        } else {
            this._inited = false;
        }

    }

    get Session() {
        return this._session;
    }

    parseData(data) {
        this.Session = new Session(
            data.account,
            data.name,
            new OrgGrade(data.orgGrade, data.orgName),
            data.orgGrade,
            data.orgNo,
            data.roleCatalog
        );
        this.menuService.updateACLFlag((data.menuDTOList || []).map((value: any) => {
            return value.no;
        }));
        this.authService.setLogin(true);

        $.cookie('webToken', data.webToken);
    }

}

