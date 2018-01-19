import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "gis-menu",
    templateUrl: "./gis.menu.component.html"
})
export class GISMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
