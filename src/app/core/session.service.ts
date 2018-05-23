import {Inject, Injectable} from "@angular/core";

import {Menu, MenuService, SettingsService} from "@microon/theme";
import {DA_SERVICE_TOKEN, TokenService} from "@microon/auth";
import {Router} from "@angular/router";
import {ReuseTabService} from "@microon/abc";
import * as _ from "lodash";

import {TOKEN_NAME} from "./constant";
import {UserInfo} from "@core/model/user.model";

/**
 * 用户登陆后 初始化相关信息
 */
@Injectable()
export class SessionService {

    private _userInfo: UserInfo;
    private _inited = false;
    private _loggedIn: boolean;

    constructor(private router: Router,
                private menuService: MenuService,
                private settings: SettingsService,
                private tokenService: TokenService,
                private reuseTabService: ReuseTabService) {
        this.tokenService.change().subscribe((res: any) => {
            console.log("change", JSON.stringify(res));
            this.settings.setUser(res);
        });
    }

    get account(){
        return this._userInfo.account;
    }

    get name(){
        return this._userInfo.name;
    }

    get inited() {
        return this._inited;
    }

    get isLoggedIn(): boolean {
        return this._loggedIn;
    }

    setLogin(value: boolean) {
        this._loggedIn = value;
    }

    private _currentPathArray: Array<Menu> = [];

    set currentPath(param: Array<Menu>) {
        this._currentPathArray.splice(0, this._currentPathArray.length);
        this._currentPathArray.push(...param);
    }

    get token() {
        const tokenModel = this.tokenService.get();
        return tokenModel ? tokenModel.token : "";
    }

    get canRetry(): boolean {
        return !!this.token;
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

    getCurrentPath(): Array<Menu> {
        return this._currentPathArray;
    }

    parseData(data) {
        this._userInfo = new UserInfo(
            data.account,
            data.name,
            data.orgNo,
            data.orgGrade,
            data.roleCatalog
        );

        if (this.menuService.menus[1].children[0].shortcut_root) {
            this.menuService.menus[1].children.splice(0, 1);
        }

        this.menuService.resume();

        this.menuService.updateACLFlag(["A"]);

        const token = {
            name: data.name,
            avatar: "./assets/img/zorro.svg",
            email: data.email || "xxx@zjft.com",
            token: data.webToken,
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
        this.router.navigateByUrl(this.tokenService.login_url);
    }
}

