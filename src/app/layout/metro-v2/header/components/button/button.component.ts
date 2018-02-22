import {Component} from '@angular/core';
import {SessionService} from '@core/session.service';
import { SettingsService } from '@microon/theme';

@Component({
    selector: 'header-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less']
})
export class HeaderButtonComponent {
    constructor(private sessionService: SessionService,
                private settings:SettingsService) {
    }

    toggle() {
        $('app-layout').toggleClass('aside-expanded');
    }

    logout() {
        this.sessionService.logout()
    }
}
