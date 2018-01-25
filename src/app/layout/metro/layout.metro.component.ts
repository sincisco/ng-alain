import {Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {IMenu, MenuConfig, refresh} from '../../pages.menu/menu.config';


@Component({
  selector: "app-layout",
  templateUrl: "./layout.metro.component.html",
  styleUrls: ["./layout.metro.component.less"]
})
export class LayoutMetroComponent implements AfterViewInit{
  isFetching = false;

  @ViewChild("metroMenuWrapper") metroMenuWrapper: ElementRef;
  @ViewChild("mySpan",
    {read: ViewContainerRef}) mySpan: ViewContainerRef;
  $menuWrapper: JQuery;
  $menuList: JQuery;

  constructor(router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    // scroll to top in change page
    router.events.subscribe(evt => {

    });
  }

  _left: number = 0;
  show: boolean = false;
  animating: false;

  showMenuPanel(menuItem: IMenu) {
      console.log(menuItem);
    var $menuWrapper = this.$menuWrapper,
      $list = this.$menuList,
      offsetLeft = this._left = $(menuItem._element).position().left;

    refresh(offsetLeft);

    if (this.show) {
      $list.transitionOnce({
        "transform": `translateX(-${offsetLeft}px)`,
        "transition": " all 0.5s ease-in-out"
      });
    } else {
      $list
        .css({
          "transform": `translateX(-${offsetLeft}px)`
        });
      setTimeout(() => {
        $menuWrapper.css({
          "transform": `translateY(0)`,
          "opacity": "1"
        });
      });
    }

    this.show = true;
  }

  hideMenuPanel() {
    var $menuWrapper = this.$menuWrapper;
    $menuWrapper.css({
      "transform": `translateY(-100%)`,
      "opacity": ".5"
    });
    this.show = false;
  }

  ngAfterViewInit() {
    this.$menuWrapper = $(this.metroMenuWrapper.nativeElement);
    this.$menuList = this.$menuWrapper.children("div.menu-list");
    this.addMouseWheel();
    setTimeout(() => {
      let viewContainerRef = this.mySpan;
      MenuConfig.forEach((menuItem: IMenu) => {
        let componentFactory = this.componentFactoryResolver
          .resolveComponentFactory(menuItem.type);
        let componentRef = viewContainerRef.createComponent(componentFactory);
        menuItem._instance = componentRef;
        menuItem._element = (<any>componentRef.hostView).rootNodes[0];
      });
    }, 0);
  }

  addMouseWheel() {
    var $menuWrapper = this.$menuWrapper,
      $list = this.$menuWrapper.children("div.menu-list");
    $menuWrapper.mousewheel((event, delta) => {
      console.log($list.width());
      console.log(this._left);
      if ((this._left >= -30) && (this._left <= ($list.width() + 50))) {


      }
      this._left = this._left - delta * 30;
      this._left = this._left < 0 ? 0 : (this._left > $list.width() ? $list.width() : this._left);
      refresh(this._left);
      $list.transitionOnce({
        "transform": `translateX(${-this._left}px)`,
        "transition": " all 0.005s ease-in-out"
      });
      return false;
    });
  };


}

