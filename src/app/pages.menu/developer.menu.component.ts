import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "developer-menu",
    templateUrl: "./developer.menu.component.html"
})
export class DeveloperMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
