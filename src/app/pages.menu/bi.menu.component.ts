import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
  selector: "bi-menu",
  templateUrl: "./bi.menu.component.html"
})
export class BIMenuComponent extends MenuBase {
  constructor(private _elementRef: ElementRef) {
    super(_elementRef);
  }
}
