import { Component} from '@angular/core';
import {MenuService} from "@microon/theme";

@Component({
    selector: 'app-layout-nav',
    templateUrl: './nav.component.html',
    styleUrls:["./nav.component.less"]
})
export class SidebarNavComponent{

    constructor(public menuService:MenuService) {

    }

    ngOnInit(){
        //this.menuService.add(MenuConfig);
    }
}
