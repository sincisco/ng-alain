import {Component} from "@angular/core";
import {SessionService} from '@core/session.service';

@Component({
    selector: 'toolbar-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.less' ]
})
export class ToolbarBreadcrumbComponent {
    constructor(public session:SessionService) { }
}
