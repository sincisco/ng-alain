import {Component, ElementRef} from '@angular/core';
import {MenuBase} from '@microon/platform';

@Component({
    selector: 'application-menu',
    templateUrl: './application.menu.component.html'
})
export class ApplicationMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
