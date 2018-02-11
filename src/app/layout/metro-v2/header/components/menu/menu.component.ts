import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Menu, MenuService } from '@delon/theme';
import { LayoutMetroV2Component } from '../../../layout.metro.component';

@Component({
    selector: 'header-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class HeaderMenuComponent implements AfterViewInit {

    menuArray: Array<Menu> = [];

    constructor(private _elementRef: ElementRef,
        private _menuService: MenuService,
        private _layout: LayoutMetroV2Component) {

        this._menuService.change.subscribe(menus => {
            this.menuArray = menus[1].children.filter(value => value._hidden == false);
        })
    }

    doShow(index) {
        this._layout.showMenuPanel(index);
    }

    ngAfterViewInit() {
        this.addMouseWheel();
    }

    addMouseWheel() {
        const $ul = $(this._elementRef.nativeElement).children('ul');
        $ul.mousewheel((event, delta, deltaX, deltaY) => {
            $ul.scrollLeft($ul.scrollLeft() - delta * 20);
            return false;
        });
    }

}
