import {SystemMenuComponent} from "./system.menu.component";
import {Menu} from "@delon/theme";

export const MenuConfig: Array<Menu> = [
  {
    "text": "主导航",
    "translate": "main_navigation",
    "group": true,
    "children": [
      {
        "text": "仪表盘",
        "translate": "dashboard",
        "link": "/dashboard",
        "icon": "mif-visa",
        "children": [
          {
            "text": "仪表盘V1",
            "link": "/dashboard/v1",
            "translate": "dashboard_v1"
          },
          {
            "text": "分析页",
            "link": "/dashboard/analysis",
            "translate": "dashboard_analysis"
          }
        ]
      },
      {
        "text": "快捷菜单",
        "translate": "shortcut",
        "icon": "mif-squirrel",
        "shortcut_root": true,
        "children": []
      },
      {
        "text": "小部件",
        "translate": "widgets",
        "link": "/widgets",
        "icon": "mif-bicycle",
        "badge": 2
      }
    ]
  },
  {
    text: "平台管理",
    group: true,
    icon: "zijin-icon-system",
    menu_type: SystemMenuComponent,
    children: [
      {
        "text": "用户管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.user",
            "text": "用户信息",
            "link": "/system/user",
          },
          {
            "id": "system.password",
            "text": "用户密码",
            "link": "/system/password"
          },
          {
            "id": "system.role",
            "text": "角色权限",
            "link": "/system/role",
          },
          {
            "id": "system.org",
            "text": "机构管理",
            "link": "/system/org",
          }
        ]
      }
    ]
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
    item.menu_type && (array.indexOf(item.menu_type) === -1) && array.push(item.menu_type);
  });
  return array;
}

