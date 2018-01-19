import { Component} from '@angular/core';
import {MenuConfig} from "../../../../pages.menu/menu.config";
import {MetroMenuService} from "../../../../../platform/core/services/menu.metro.service";

@Component({
    selector: 'app-layout-nav',
    templateUrl: './nav.component.html',
    styleUrls:["./nav.component.less"]
})
export class SidebarNavComponent{

    constructor(public menuService:MetroMenuService) {

    }

    ngOnInit(){
        this.menuService.add(MenuConfig);
    }
}
