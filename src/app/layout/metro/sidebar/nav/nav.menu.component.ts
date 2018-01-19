import {Component, Input} from '@angular/core';
import {Menu} from "@delon/theme";

@Component({
  selector: 'ul[nav-menu]',
  templateUrl: './nav.menu.component.html',
  host: {
    '[class]': "_class"
  }
})
export class NavMenuComponent {

  _class: string = "";

  @Input("source")
  data: Menu;

  constructor() {

  }

  ngOnInit() {
    this._class = `nav nav-sub nav-depth${this.data._depth}`
  }
}
