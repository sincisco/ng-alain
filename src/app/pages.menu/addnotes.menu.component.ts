import {Component, ElementRef} from "@angular/core";
import {MenuBase} from "../../platform/core/interfaces/menu";

@Component({
    selector: "addnotes-menu",
    templateUrl: "./addnotes.menu.component.html"
})
export class AddnotesMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(   _elementRef);
    }
}
