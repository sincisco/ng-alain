import {SystemMenuComponent} from "./system.menu.component";
import {AddnotesMenuComponent} from "./addnotes.menu.component";
import {GISMenuComponent} from "./gis.menu.component";
import {StaticReportMenuComponent} from "./staticReport.menu.component";
import {WatcherMenuComponent} from "./watcher.menu.component";
import {DeveloperMenuComponent} from "./developer.menu.component";
import {MonitorMenuComponent} from "./monitor.menu.component";
import {DetailQueryMenuComponent} from "./detailQuery.menu.component";
import {BIMenuComponent} from "./bi.menu.component";
import {DataMiningMenuComponent} from "./dataMining.menu.component";
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
      },
      {
        "text": "组件管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.chart",
            "text": "图表组件管理",
            "link": "/system/chartsManage",
          }
        ]
      },
      {
        "text": "定时任务管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.timeJob",
            "text": "定时任务管理",
            "link": "/system/timeJob",
          },
          {
            "id": "system.log",
            "text": "定时任务日志管理",
            "link": "/system/log",
          }
        ]
      },
      {
        "text": "其他管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.cost",
            "text": "成本管理",
            "link": "/system/cost",
          },
          {
            "id": "system.detail",
            "text": "明细查询管理",
            "link": "/system/detail",
          }
        ]
      }

    ]
  },
  {
    text: "明细查询",
    group: true,
    icon: "zijin-icon-detailQuery",
    menu_type: DetailQueryMenuComponent,
    "children": [
      {
        "id": "detalQuery.meau",
        "text": "明细查询菜单",
        "link": "/detalQuery/meau",
      },
      {
        "id":"detalQuery.dataMining",
        "text": "数据挖掘",
        "link": "/dataMining/customer",
      }
  ]
  },
  {
    text: "GIS分析",
    group: true,
    icon: "zijin-icon-map",
    menu_type: GISMenuComponent,
    children: [
      {
        "id": "gis.offlineAnalysis",
        "text": "线下渠道运营管理分析",
        "link": "/gis/offlineAnalysis",
      },
    ]
  },
  {
    text: "统计报表",
    group: true,
    icon: "zijin-icon-report",
    menu_type: StaticReportMenuComponent,
    children: [
      {
        "text": "统计报表",
        "icon": "mif-visa",
        "children": [
          {
            "id": "report.static",
            "text": "固定报表",
            "link": "/report/staticReports",
          },
          {
            "id": "report.report",
            "text": "交互式报表",
            "link": "/report/dynamicReports",
          }
        ]
      }
      ]
  },
  {
    text: "平台监控",
    group: true,
    icon: "zijin-icon-monitor",
    menu_type: MonitorMenuComponent,
    children: [
      {
        "text": "集群监控",
        "icon": "mif-visa",
        children: [
          {
            "text": "集群监控",
            "icon": "mif-visa",
            "children": [
              {
                "id": "monitor.hdfs",
                "text": "HDFS监控",
                "link": "/monitor/datamonitor/hdfs",
              },
              {
                "id": "monitor.mapreduce",
                "text": "MapReduce",
                "link": "/monitor/datamonitor/mapreduce"
              },
              {
                "id": "monitor.hbase",
                "text": "HBase监控",
                "link": "/monitor/datamonitor/hbase",
              },
              {
                "id": "monitor.spark",
                "text": "Spark监控",
                "link": "/monitor/datamonitor/spark",
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "开发者模式",
    group: true,
    icon: "zijin-icon-development",
    menu_type: DeveloperMenuComponent,
    children: [
      {
        "text": "组件开发",
        "icon": "mif-visa",
        "children": [
          {
            "id": "develop.chart",
            "text": "图表组件开发",
            "link": "/developer/chartsDevelop",
          },
          {
            "id": "system.password",
            "text": "多维报表开发",
            "link": "/system/password"
          },
          {
            "id": "system.role",
            "text": "明细查询开发",
            "link": "/system/role",
          }
        ]
      },
      {
        "text": "OLAP管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.user",
            "text": "OLAP维护",
            "link": "/system/user",
          }
        ]
      },
      {
        "text": "报表模板管理",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.timeJob",
            "text": "报表模板管理",
            "link": "/system/timeJob",
          }
        ]
      },
      {
        "text": "GIS开发",
        "icon": "mif-visa",
        "children": [
          {
            "id": "system.cost",
            "text": "GIS开发",
            "link": "/system/cost",
          }
        ]
      }

    ]
  },
  {
    text: "多维分析",
    group: true,
    icon: "zijin-icon-multianalysis",
    menu_type: BIMenuComponent,
    children: [
      {
        "id": "bi.mdReport",
        "text": "多维报表",
        "link": "/bi/olap/mdReport",
      },
      {
        "id": "bi.adHocQuery",
        "text": "即席分析",
        "link": "/bi/olap/adHocQuery",
      },
    ]
  },
  {
    text: "监控预警",
    group: true,
    icon: "zijin-icon-monitor2",
    menu_type: WatcherMenuComponent
  },
  {
    text: "加钞运维",
    group: true,
    icon: "zijin-icon-addnotes_maintain",
    menu_type: AddnotesMenuComponent
  },
  {
    text: "数据挖掘",
    group: true,
    icon: "zijin-icon-dataMining",
    menu_type: DataMiningMenuComponent,
    children: [
      {
        "id": "system.org",
        "text": "客户行为分析",
        "link": "/system/org",
      },
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


/**
 *   {
    "text": "组件",
    "translate": "component",
    "group": true,
    "children": [
      {
        "text": "基础元素",
        "translate": "elements",
        "link": "/elements",
        "icon": "mif-visa",
        "acl": "role-a",
        "children": [
          {
            "text": "按钮",
            "link": "/elements/buttons",
            "translate": "buttons",
            "shortcut": true
          },
          {
            "text": "Notification",
            "link": "/elements/notification",
            "translate": "notification",
            "shortcut": true
          },
          {
            "text": "Modal",
            "link": "/elements/modal",
            "translate": "modal"
          },
          {
            "text": "SweetAlert",
            "link": "/elements/sweetalert",
            "translate": "sweetalert"
          },
          {
            "text": "Tree Antd",
            "link": "/elements/tree-antd",
            "translate": "tree-antd"
          },
          {
            "text": "Sortable",
            "link": "/elements/sortable",
            "translate": "sortable"
          },
          {
            "text": "Spin",
            "link": "/elements/spin",
            "translate": "spin"
          },
          {
            "text": "Dropdown",
            "link": "/elements/dropdown",
            "translate": "dropdown"
          },
          {
            "text": "Grid",
            "link": "/elements/grid",
            "translate": "grid"
          },
          {
            "text": "Grid Masonry",
            "link": "/elements/gridmasonry",
            "translate": "gridmasonry"
          },
          {
            "text": "Typography",
            "link": "/elements/typography",
            "translate": "typography"
          },
          {
            "text": "Font Icons",
            "link": "/elements/iconsfont",
            "translate": "iconsfont"
          },
          {
            "text": "Colors",
            "link": "/elements/colors",
            "translate": "colors"
          }
        ]
      },
      {
        "text": "表单",
        "translate": "forms",
        "link": "/forms",
        "icon": "mif-visa",
        "acl": "role-a",
        "children": [
          {
            "text": "标准",
            "link": "/forms/standard",
            "translate": "standard"
          },
          {
            "text": "扩展",
            "link": "/forms/extended",
            "translate": "extended"
          },
          {
            "text": "校验",
            "link": "/forms/validation",
            "translate": "validation"
          },
          {
            "text": "上传",
            "link": "/forms/upload",
            "translate": "upload",
            "shortcut": true
          },
          {
            "text": "图片裁剪",
            "link": "/forms/cropper",
            "translate": "cropper"
          }
        ]
      },
      {
        "text": "Charts",
        "translate": "charts",
        "link": "/charts",
        "icon": "mif-visa",
        "acl": "role-a",
        "children": [
          {
            "text": "G2",
            "link": "/charts/g2"
          }
        ]
      },
      {
        "text": "表格",
        "translate": "tables",
        "link": "/tables",
        "icon": "mif-visa",
        "acl": "role-b",
        "children": [
          {
            "text": "标准",
            "link": "/tables/standard",
            "translate": "standard"
          },
          {
            "text": "Full",
            "link": "/tables/full",
            "translate": "full"
          }
        ]
      },
      {
        "text": "地图",
        "translate": "maps",
        "link": "/maps",
        "icon": "mif-visa",
        "acl": "role-b",
        "children": [
          {
            "text": "QQ",
            "link": "/maps/qq",
            "translate": "qq"
          },
          {
            "text": "Baidu",
            "link": "/maps/baidu",
            "translate": "baidu"
          }
        ]
      }
    ]
  },
  {
    "text": "Pro",
    "translate": "pro",
    "group": true,
    "children": [
      {
        "text": "Form Page",
        "translate": "form",
        "link": "/pro/form",
        "icon": "icon-note",
        "children": [
          {
            "text": "Step Form",
            "link": "/pro/form/step-form",
            "translate": "step-form"
          },
          {
            "text": "Advanced Form",
            "link": "/pro/form/advanced-form",
            "translate": "advanced-form"
          }
        ]
      },
      {
        "text": "List",
        "translate": "pro-list",
        "link": "/pro/list",
        "icon": "icon-grid",
        "children": [
          {
            "text": "Table List",
            "link": "/pro/list/table-list",
            "translate": "pro-table-list"
          },
          {
            "text": "Basic List",
            "link": "/pro/list/basic-list",
            "translate": "pro-basic-list"
          },
          {
            "text": "Card List",
            "link": "/pro/list/card-list",
            "translate": "pro-card-list"
          },
          {
            "text": "Cover Card List",
            "link": "/pro/list/cover-card-list",
            "translate": "pro-cover-card-list"
          },
          {
            "text": "Filter Card List",
            "link": "/pro/list/filter-card-list",
            "translate": "pro-filter-card-list"
          },
          {
            "text": "Search",
            "link": "/pro/list/search",
            "translate": "pro-search"
          }
        ]
      },
      {
        "text": "Profile",
        "translate": "pro-profile",
        "link": "/pro/profile",
        "icon": "icon-book-open",
        "children": [
          {
            "text": "Basic",
            "link": "/pro/profile/basic",
            "translate": "pro-profile-basic"
          },
          {
            "text": "Advanced",
            "link": "/pro/profile/advanced",
            "translate": "pro-profile-advanced"
          }
        ]
      },
      {
        "text": "Result",
        "translate": "pro-result",
        "link": "/pro/result",
        "icon": "mif-visa",
        "children": [
          {
            "text": "Success",
            "link": "/pro/result/success",
            "translate": "pro-result-success"
          },
          {
            "text": "Fail",
            "link": "/pro/result/fail",
            "translate": "pro-result-fail"
          }
        ]
      },
      {
        "text": "Exception",
        "translate": "pro-exception",
        "link": "/pro/exception",
        "icon": "icon-fire",
        "children": [
          {
            "text": "403",
            "link": "/pro/exception/403"
          },
          {
            "text": "404",
            "link": "/pro/exception/404"
          },
          {
            "text": "500",
            "link": "/pro/exception/500"
          }
        ]
      },
      {
        "text": "User",
        "translate": "pro-user",
        "link": "/pro/user",
        "icon": "icon-user",
        "children": [
          {
            "text": "login",
            "link": "/pro/user/login",
            "translate": "pro-login"
          },
          {
            "text": "register",
            "link": "/pro/user/register",
            "translate": "pro-register"
          },
          {
            "text": "register result",
            "link": "/pro/user/register-result",
            "translate": "pro-register-result"
          }
        ]
      }
    ]
  },
  {
    "text": "More",
    "translate": "more",
    "group": true,
    "children": [
      {
        "text": "Common Logics",
        "translate": "logics",
        "link": "/logics",
        "icon": "mif-visa",
        "children": [
          {
            "text": "ACL",
            "link": "/logics/acl",
            "translate": "acl"
          },
          {
            "text": "Route Guard",
            "link": "/logics/guard",
            "translate": "guard",
            "acl": "admin"
          },
          {
            "text": "Down File",
            "link": "/logics/downfile",
            "translate": "downfile",
            "shortcut": true
          }
        ]
      },
      {
        "text": "Report",
        "translate": "report",
        "icon": "anticon anticon-cloud-o",
        "children": [
          {
            "text": "Relation",
            "link": "/data-v/relation",
            "translate": "relation",
            "target": "_blank",
            "shortcut": true
          }
        ]
      },
      {
        "text": "Pages",
        "translate": "pages",
        "link": "/pages",
        "icon": "icon-doc",
        "acl": "admin",
        "children": [
          {
            "text": "Login",
            "link": "/login",
            "translate": "m-login"
          },
          {
            "text": "Register",
            "link": "/register",
            "translate": "m-register"
          },
          {
            "text": "Forget",
            "link": "/forget",
            "translate": "m-forget"
          },
          {
            "text": "Lock",
            "link": "/lock",
            "translate": "m-lock"
          },
          {
            "text": "404",
            "link": "/404"
          },
          {
            "text": "500",
            "link": "/500"
          },
          {
            "text": "Maintenance",
            "link": "/maintenance",
            "translate": "maintenance"
          }
        ]
      },
      {
        "text": "Extras",
        "translate": "extras",
        "link": "/extras",
        "icon": "icon-cup",
        "children": [
          {
            "text": "Blog",
            "link": "/extras/blog",
            "translate": "blog",
            "children": [
              {
                "text": "List",
                "link": "/extras/blog/list",
                "translate": "list",
                "badge": 1,
                "badge_dot": true
              },
              {
                "text": "Comment",
                "link": "/extras/blog/comment",
                "translate": "comment"
              },
              {
                "text": "Post",
                "link": "/extras/blog/post",
                "translate": "post"
              },
              {
                "text": "WebSite",
                "externalLink": "//github.com/cipchk/ng-alain",
                "target": "_blank",
                "translate": "website"
              }
            ]
          },
          {
            "text": "Help Center",
            "link": "/extras/helpcenter",
            "translate": "helpcenter"
          },
          {
            "text": "Settings",
            "link": "/extras/settings",
            "translate": "settings"
          },
          {
            "text": "Poi",
            "link": "/extras/poi",
            "translate": "poi"
          }
        ]
      }
    ]
  },
  {
    text: "平台管理",
    group: true,
    icon: "zijin-icon-system",
    menu_type: SystemMenuComponent,
    children:[
      {
        "text": "用户管理",
        "icon": "mif-visa",
        "children": [
          {
            "id":"system.user",
            "text": "用户信息",
            "link": "/system/user",
          },
          {
            "id":"system.password",
            "text": "用户密码",
            "link": "/system/password"
          },
          {
            "id":"system.role",
            "text": "角色权限",
            "link": "/system/role",
          },
          {
            "id":"system.org",
            "text": "机构管理",
            "link": "/system/org",
          }
        ]
      }
    ]
  },
  {
    text: "加钞运维",
    group: true,
    icon: "zijin-icon-addnotes_maintain",
    menu_type:AddnotesMenuComponent
  },
  {
    text: "明细查询",
    group: true,
    icon: "zijin-icon-detailQuery",
    menu_type: DetailQueryMenuComponent
  },
  {
    text: "GIS分析",
    group: true,
    icon: "zijin-icon-map",
    menu_type: GISMenuComponent
  },
  {
    text: "统计报表",
    group: true,
    icon: "zijin-icon-report",
    menu_type: StaticReportMenuComponent
  },
  {
    text: "平台监控",
    group: true,
    icon: "zijin-icon-system",
    menu_type: MonitorMenuComponent
  },
  {
    text: "监控预警",
    group: true,
    icon: "zijin-icon-monitor2",
    menu_type: WatcherMenuComponent
  },
  {
    text: "开发者模式",
    group: true,
    icon: "zijin-icon-development",
    menu_type: DeveloperMenuComponent,
    children:[
      {
        "text": "组件开发",
        "icon": "mif-visa",
        "children": [
          {
            "id":"developer.chart",
            "text": "图表组件开发",
            "link": "/developer/chartsDevelop",
          }


        ]
      }
    ]
  }
];

export function refresh(left: number) {
  MenuConfig.forEach((menu: Menu) => {
    if(!menu._element){
      return false;
    }
    menu._active = false;
    var $element = $(menu._element),
      offsetLeft = $element.position().left;

    if ((left > (offsetLeft - 20)) && (left < (offsetLeft + $element.width()))) {
      menu._active = true;
    }
  });

}

export function getMenuComponentArray() {
  var array = [];
  MenuConfig.forEach((item) => {
    item.menu_type&&(array.indexOf(item.menu_type) === -1) && array.push(item.menu_type);
  });
  return array;
}*/
