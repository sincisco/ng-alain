import {Component, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    encapsulation: ViewEncapsulation.Emulated,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
    constructor(private _elementRef: ElementRef) {
        $(_elementRef.nativeElement).addClass("aside-metro");
    }
}
