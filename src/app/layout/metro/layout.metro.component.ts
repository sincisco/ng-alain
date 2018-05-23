import {Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit} from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import {IMenu, MenuConfig, refresh} from '../../pages.menu/menu.config';
import { ScrollService } from '@microon/theme';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.metro.component.html',
    styleUrls: ['./layout.metro.component.less']
})
export class LayoutMetroComponent implements AfterViewInit {
    isFetching = false;

    @ViewChild('metroMenuWrapper') metroMenuWrapper: ElementRef;
    @ViewChild('mySpan',
        {read: ViewContainerRef}) mySpan: ViewContainerRef;
    $menuWrapper: JQuery;
    $menuList: JQuery;

    constructor(router: Router,
                scroll: ScrollService,
                private _message: NzMessageService,
                private componentFactoryResolver: ComponentFactoryResolver) {

        // scroll to top in change page
        router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                _message.error(`无法加载${evt.url}路由`, {nzDuration: 1000 * 3});
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

    _left = 0;
    show = false;
    animating: false;

    showMenuPanel(menuItem: IMenu) {
        const $menuWrapper = this.$menuWrapper,
            $list = this.$menuList,
            offsetLeft = this._left = $(menuItem._element).position().left;

        refresh(offsetLeft);

        if (this.show) {
            // metro菜单显示 动画效果滑动到指定位置
            $list.transitionOnce({
                'transform': `translateX(-${offsetLeft}px)`,
                'transition': ' all 0.5s ease-in-out'
            });
        } else {
            // metro菜单隐藏 直接跳转到指定位置
            // 显示metro菜单
            $list.css({
                'transform': `translateX(-${offsetLeft}px)`
            });
            $menuWrapper.css({
                'transform': `translateY(0)`,
                'opacity': '1'
            });
            this.show = true;
        }
    }

    hideMenuPanel() {
        this.$menuWrapper.css({
            'transform': `translateY(-100%)`,
            'opacity': '.5'
        });
        this.show = false;
    }

    ngAfterViewInit() {
        this.$menuWrapper = $(this.metroMenuWrapper.nativeElement);
        this.$menuList = this.$menuWrapper.children('div.menu-list');
        this.addMouseWheel();
        setTimeout(() => {
            const viewContainerRef = this.mySpan;
            MenuConfig.forEach((menuItem: IMenu) => {
                const componentFactory = this.componentFactoryResolver
                    .resolveComponentFactory(menuItem.type);
                const componentRef = viewContainerRef.createComponent(componentFactory);
                menuItem._instance = componentRef;
                menuItem._element = (<any>componentRef.hostView).rootNodes[0];
            });
        }, 0);
    }

    addMouseWheel() {
        const $menuWrapper = this.$menuWrapper,
            $list = this.$menuWrapper.children('div.menu-list');
        $menuWrapper.mousewheel((event, delta) => {
            this._left = this._left - delta * 30;
            const enableWidth = $list.width() - $menuWrapper.width();
            this._left = this._left < 0 ? 0 : (this._left > enableWidth ? enableWidth : this._left);
            refresh(this._left);
            $list.transitionOnce({
                'transform': `translateX(${-this._left}px)`,
                'transition': ' all 0.01s ease-in-out'
            });
            return false;
        });
    }

}

