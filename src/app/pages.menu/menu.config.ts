import {SystemMenuComponent} from "./system.menu.component";
import {Menu} from "@delon/theme";

export interface IMenu{
    type:any,
    icon:string,
    text:string,
    _instance:any,
    _element:any,
    _active:boolean
}

export const MenuConfig: Array<any> = [
    {
        type:SystemMenuComponent,
        text: "平台管理",
        icon: "zijin-icon-system",
    }
];

export function refresh(left: number) {
  left=Math.round(left)+2;
  MenuConfig.forEach((menu: Menu) => {
    if ( !menu._element) {
      return false;
    }
    menu._active = false;
    var $element = $(menu._element),
      offsetLeft = Math.round($element.position().left);
    console.log(left,offsetLeft,offsetLeft + $element.width());
    if ((left >= offsetLeft ) && (left < offsetLeft + $element.width())) {
      menu._active = true;
    }
  });
}

export function getMenuComponentArray() {
  var array = [];
  MenuConfig.forEach((item) => {
    item.type && (array.indexOf(item.type) === -1) && array.push(item.type);
  });
  return array;
}

