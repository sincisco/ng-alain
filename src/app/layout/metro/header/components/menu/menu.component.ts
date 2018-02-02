import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuService } from '@delon/theme';
import { LayoutMetroComponent } from '../../../layout.metro.component';
import { MenuConfig } from '../../../../../pages.menu/menu.config';

@Component({
    selector: 'header-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class HeaderMenuComponent implements AfterViewInit {

    menuArray: Array<Menu> = [];

    constructor(private _elementRef: ElementRef,
                private router: Router,
                private _menuService:MenuService,
                private _layout: LayoutMetroComponent) {
        this.menuArray = MenuConfig;
    }

    doShow(param) {
        this._layout.showMenuPanel(param);
    }

    ngAfterViewInit() {
        this.addMouseWheel();
    }

    ngOnInit(){

    }

    addMouseWheel() {
        const $ul = $(this._elementRef.nativeElement).children('ul');
        $ul.mousewheel((event, delta, deltaX, deltaY) => {
            $ul.scrollLeft($ul.scrollLeft() - delta * 20);
            return false;
        });
    }

    enable(text:string){
        var ret=false;
        this._menuService.visit((menu:Menu)=>{
            if(menu.text==text&&!menu._hidden){
                ret=true;
            }
        });
        return ret;
    }
}
