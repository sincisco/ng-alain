import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Menu, MenuService} from "@microon/theme";

const excludes = ["/home"];

// TODO: 验证用户是否登录
@Injectable()
export class AuthService {
    constructor(private _menuService: MenuService) {

    }

    checkPermission(url: string): boolean {
        let ret = true;
        if (excludes.includes(url)) {
            return true;
        }
        this._menuService.visit((menu: Menu) => {
            if (menu.link === url && !menu._hidden) {
                ret = true;
            }
        });
        return true;
    }
}
