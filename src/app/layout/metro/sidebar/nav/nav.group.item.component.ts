import {Component, Input} from '@angular/core';
import {MetroMenuService} from "../../../../../platform/core/services/menu.metro.service";
import {Menu} from "@delon/theme";


@Component({
    selector: 'li[nav-group-item]',
    templateUrl: './nav.group.item.component.html'
})
export class NavGroupItemComponent{

    @Input("source")
    data:Menu;

    constructor(private menuService:MetroMenuService) {

    }

    toggleOpen(item: Menu) {
        this.menuService.visit((i, p) => {
            if (i !== item) {
                i._open = false;
            }
        });
        item._open = !item._open;
    }

}
