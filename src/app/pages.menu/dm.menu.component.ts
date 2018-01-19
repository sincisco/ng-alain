import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "dm-menu",
    templateUrl: "./dm.menu.component.html"
})
export class DMMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
