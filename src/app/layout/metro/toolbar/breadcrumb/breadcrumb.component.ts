import {Component} from "@angular/core";
import {BreadcrumbService} from "./breadcrumb.service";

@Component({
    selector: 'toolbar-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.less' ]
})
export class ToolbarBreadcrumbComponent {
    constructor(public breadcrumbService:BreadcrumbService) { }
}
