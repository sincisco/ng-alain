import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from "@angular/core";
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { ScrollService, MenuService, Menu } from '@microon/theme';
import { NzMessageService } from 'ng-zorro-antd';

import "rxjs/add/operator/delay";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.metro.component.html",
    styleUrls: ["./layout.metro.component.less"]
})
export class LayoutMetroV2Component implements AfterViewInit {
    isFetching = false;

    @ViewChild("metroMenuWrapper") metroMenuWrapper: ElementRef;
    $menuWrapper: JQuery;
    $menuList: JQuery;
    menus: Menu[];

    constructor(router: Router,
        scroll: ScrollService,
        private menuService: MenuService,
        private _message: NzMessageService,
        private componentFactoryResolver: ComponentFactoryResolver) {

        // scroll to top in change page
        router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            setTimeout(() => {
                scroll.scrollToTop();
                this.isFetching = false;
            }, 100);
        });
    }

    _left: number = 0;
    show: boolean = false;
    animating: false;

    showMenuPanel(index) {
        var $menuWrapper = this.$menuWrapper,
            $list = this.$menuList,
            offsetLeft = this._left = $($(`div.menu-list`).children()[index]).position().left;

        this.refresh();

        if (this.show) {
            // metro菜单显示 动画效果滑动到指定位置
            $list.transitionOnce({
                "transform": `translateX(-${offsetLeft}px)`,
                "transition": " all 0.5s ease-in-out"
            });
        } else {
            // metro菜单隐藏 直接跳转到指定位置
            // 显示metro菜单
            $list.css({
                "transform": `translateX(-${offsetLeft}px)`
            });
            $menuWrapper.css({
                "transform": `translateY(0)`,
                "opacity": "1"
            });
            this.show = true;
        }
    }

    hideMenuPanel() {
        this.$menuWrapper.css({
            "transform": `translateY(-100%)`,
            "opacity": ".5"
        });
        this.show = false;
    }

    ngAfterViewInit() {
        this.$menuWrapper = $(this.metroMenuWrapper.nativeElement);
        this.$menuList = this.$menuWrapper.children("div.menu-list");
        this.addMouseWheel();
        this.menuService.change.delay(0).subscribe(menus => {
            this.menus = menus[1].children.filter(value => value._hidden == false);
        });
    }

    addMouseWheel() {
        var $menuWrapper = this.$menuWrapper,
            $list = this.$menuWrapper.children("div.menu-list");
        $menuWrapper.mousewheel((event, delta) => {
            this._left = this._left - delta * 30;
            var enableWidth = $list.width() - $menuWrapper.width();
            this._left = this._left < 0 ? 0 : (this._left > enableWidth ? enableWidth : this._left);
            this.refresh();
            $list.transitionOnce({
                "transform": `translateX(${-this._left}px)`,
                "transition": " all 0.01s ease-in-out"
            });
            return false;
        });
    }

    refresh() {
        let left = Math.round(this._left) + 2;
        this.menus.forEach((menu: Menu, index) => {
            let $element = $($(`div.menu-list`).children()[index]);
            if (!$element) {
                return false;
            }
            menu._selected = false;
            let offsetLeft = Math.round($element.position().left);
            if ((left >= offsetLeft) && (left < offsetLeft + $element.width())) {
                menu._selected = true;
            }
        });
    }

}

