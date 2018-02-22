import { Inject, Injectable } from '@angular/core';
import { Session } from '../models/session';
import { OrgGrade } from '../models/orgGrade';
import { Menu, MenuService, SettingsService } from '@microon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@microon/auth';
import { Router } from '@angular/router';
import { ReuseTabService } from '@microon/abc';
import * as _ from 'lodash';

import { TOKEN_NAME } from './constant';
/**
 * 用户登陆后 初始化相关信息
 */
@Injectable()
export class SessionService {

    private _inited = false;
    private _session: Session;  // TODO: 应该定义为private
    private _loggedIn: boolean;

    constructor(private menuService: MenuService,
        private router: Router,
        private settings: SettingsService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
        private reuseTabService: ReuseTabService) {
        this.tokenService.change().subscribe((res: any) => {
            console.log('change', JSON.stringify(res));
            this.settings.setUser(res);
        });
    }

    get inited() {
        return this._inited;
    }

    set Session(session: any) {
        this._session = session;
        this._inited = session ? true : false;
    }

    get Session() {
        return this._session;
    }

    getUserSession() {
        return this._session;
    }

    get isLoggedIn(): boolean {
        return this._loggedIn;
    }

    setLogin(value: boolean) {
        this._loggedIn = value;
    }

    private _currentPath: Array<Menu> = [];

    set currentPath(param: Array<Menu>) {
        this._currentPath.splice(0, this._currentPath.length);
        this._currentPath.push(...param);
    }

    get token() {
        const tokenModel = this.tokenService.get();
        return tokenModel ? tokenModel.token : '';
    }

    get canRetry(): boolean {
        return !!$.cookie(TOKEN_NAME);
    }

    set redirect(param: string) {
        this.tokenService.redirect = param;
    }

    get redirect(): string {
        return this.tokenService.redirect;
    }

    get login_url(): string {
        return this.tokenService.login_url;
    }

    getCurrentPath() {
        return this._currentPath;
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
        
        if(this.menuService.menus[1].children[0].shortcut_root) {
            this.menuService.menus[1].children.splice(0,1);
        }
        this.menuService.visit((menu, parent) => {
            menu._hidden = true;
            let menuDTO = (data.menuDTOList || []).find(value => !menu.serverID || value.no == menu.serverID);
            if (!_.isUndefined(menuDTO)) {
                menu._hidden = false;
                menu.shortcut = menuDTO.shortcut || false;
            }
        });
        this.menuService.resume();
        let shortcuts = this.menuService.menus[0].children.find(menu => menu.shortcut_root);
        if (shortcuts) {
            let poi = _.isUndefined(this.menuService.menus[1].children[0].shortcut_root) ? 0 : 1;
            this.menuService.menus[1].children.splice(0, poi, shortcuts);
            this.menuService.resume();
        }

        const token = {
            name: data.name,
            avatar: './assets/img/zorro.svg',
            email: data.email || 'xxx@zjft.com',
            token: null,
        };
        $.cookie(TOKEN_NAME, data.webToken);
        console.log(JSON.stringify(token));
        this.tokenService.set(token);
        this._loggedIn = true;
    }

    logout() {
        this.reuseTabService.clear();
        this.tokenService.clear();
        this._loggedIn = false;
        $.cookie(TOKEN_NAME, "");
        this.router.navigateByUrl(this.tokenService.login_url);
    }
}

