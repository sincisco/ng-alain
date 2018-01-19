import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "system-menu",
    templateUrl: "./system.menu.component.html"
})
export class SystemMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef ) {
        super(_elementRef);
    }
}
