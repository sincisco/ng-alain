import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
  selector: "dataMining-menu",
  templateUrl: "./dataMining.menu.component.html"
})

export class DataMiningMenuComponent extends MenuBase {
  constructor(private _elementRef: ElementRef) {
    super(_elementRef);
  }
}
