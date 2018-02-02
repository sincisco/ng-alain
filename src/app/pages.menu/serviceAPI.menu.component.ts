import {Component, ElementRef} from '@angular/core';
import {MenuBase} from '@microon/platform';

@Component({
    selector: 'serviceAPI-menu',
    templateUrl: './serviceAPI.menu.component.html'
})
export class ServiceAPIMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
