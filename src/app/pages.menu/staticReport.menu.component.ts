import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "staticReport-menu",
    templateUrl: "./staticReport.menu.component.html"
})
export class StaticReportMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
