import {Component, Input} from '@angular/core';
import {Menu, MenuService} from "@delon/theme";


@Component({
    selector: 'li[nav-group-item]',
    templateUrl: './nav.group.item.component.html'
})
export class NavGroupItemComponent{

    @Input("source")
    data:Menu;

    constructor(private menuService:MenuService) {

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
