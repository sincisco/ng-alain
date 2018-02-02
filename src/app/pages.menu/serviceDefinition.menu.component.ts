import {Component, ElementRef} from '@angular/core';
import {MenuBase} from '@microon/platform';

@Component({
    selector: 'serviceDefinition-menu',
    templateUrl: './serviceDefinition.menu.component.html'
})
export class ServiceDefinitionMenuComponent extends MenuBase {
    constructor(private _elementRef: ElementRef) {
        super(_elementRef);
    }
}
