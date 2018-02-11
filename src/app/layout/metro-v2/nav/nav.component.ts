import {Component, Input, ElementRef} from "@angular/core";
import { MenuBase } from '@microon/platform';
import { Menu } from '@microon/theme';

@Component({
    selector: "metro-nav",
    templateUrl: "./nav.component.html"
})
export class MetroNavComponent extends MenuBase {
    @Input() menu:Menu;
    constructor(private _elementRef: ElementRef ) {
        super(_elementRef);
    }
}
