import { Injectable } from '@angular/core';
import {Menu} from "@delon/theme";
import {ACLService} from "@delon/acl";

@Injectable()
export class MetroMenuService {

  private _menus: Menu[];

  setMenus(menus: Menu[]) {
    this._menus = menus;
  }

  currentMenu: string = null;
  private data: Menu[] = [];

  private list: Array<Menu>=[];

  constructor(private aclService: ACLService) { }

  visit(callback: (item: Menu, parentMenu: Menu, depth?: number) => void) {
    const inFn = (list: Menu[], parentMenu: Menu, depth: number) => {
      for (const item of list) {
        callback(item, parentMenu, depth);
        if (item.children && item.children.length > 0) {
          inFn(item.children, item, depth + 1);
        } else {
          item.children = [];
        }
      }
    };

    inFn(this.data, null, 0);
  }

  convertTreeToList(){
    var list=this.list;
    this.visit((item: Menu, parentMenu: Menu, depth?: number)=>{
      list.push(item);
    })
  }

  add(items: Menu[]) {
    this.data.push(...items);
    this.resume();
    this.convertTreeToList();
  }

  /**
   * 若用户权限变动时需要调用刷新
   */
  resume() {
    let i = 1;
    const shortcuts: Menu[] = [];
    this.visit((item, parent, depth) => {
      item.__id = i++;
      item.__parent = parent;
      item._depth = depth;


      item.hide = item.acl && !this.aclService.can(item.acl);
      item._type = item.externalLink ? 2 : 1;
      if (item.children && item.children.length > 0) {
        item._type = 3;
      }

      // shortcut
      if (item.shortcut === true && (item.link || item.externalLink))
        shortcuts.push(item);
    });

    this.loadShortcut(shortcuts);
  }

  /**
   * 加载快捷菜单，加载位置规则如下：
   * 1、统一在下标0的节点下（即【主导航】节点下方）
   *      1、若 children 存在 【shortcut_root: true】则最优先【推荐】这种方式
   *      2、否则查找带有【dashboard】字样链接，若存在则在此菜单的下方创建快捷入口
   *      3、否则放在0节点位置
   */
  private loadShortcut(shortcuts: Menu[]) {
    if (shortcuts.length === 0 || this.data.length === 0) return;

    const ls = this.data[0].children || [];
    let pos = ls.findIndex(w => w.shortcut_root === true);
    if (pos === -1) {
      pos = ls.findIndex(w => w.link.includes('dashboard') || w.externalLink.includes('dashboard'));
      pos = (pos !== -1 ? pos : 0) + 1;
      this.data[0].children.splice(pos, 0, {
        text: '快捷菜单',
        translate: 'shortcut',
        icon: 'icon-rocket',
        children: []
      });
    }
    let _data = this.data[0].children[pos];
    _data = Object.assign(_data, {
      _type: 3,
      __id: -1,
      _depth: 1
    });
    _data.children = shortcuts.map(i => {
      i._depth = 2;
      return i;
    });
  }

  get menus() {
    return this.data;
  }

  setDefault(url: string) {
    if (!url) {
      return;
    }

    let findItem: Menu = null;
    this.visit(item => {
      item._open = false;
      if (!item.link) {
        return;
      }
      if (!findItem && item.link.includes(url)) {
        findItem = item;
      }
    });
    if (!findItem) {
      console.warn(`not found page name: ${url}`);
      return;
    }

    do {
      findItem._open = true;
      findItem = findItem.__parent;
    } while (findItem);
  }

  /**
   * 根据url获取菜单列表
   * @param url
   */
  getPathByUrl(url: string): Menu[] {
    let item: Menu = null;
    this.visit((i, parent, depth) => {
      if (i.link === url) {
        item = i;
      }
    });

    const ret: Menu[] = [];
    if (!item) return ret;

    do {
      ret.splice(0, 0, item);
      item = item.__parent;
    } while (item);

    return ret;
  }

  /**
   * 根据菜单id判断tile是否可见
   * */
  hasPermission(id: string) {
    return this.list.some((menu:Menu,index:number,array:Menu[])=>{
      if(menu.id===id) return true;
    });
  }

  getUrl(id: string){
    for(var menu of this.list){
      if(id===(<any>menu).id){
        console.log("success",menu.link);
        return menu.link
      }
    }
    return "";
  }
}
