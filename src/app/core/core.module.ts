import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './module-import-guard';

import {I18NService} from './i18n/i18n.service';
import {AuthGuard} from '@core/guard/auth-guard.service';
import {SessionService} from '@core/session.service';
import {LoginGuard} from '@core/guard/login-guard.service';

@NgModule({
    providers: [
        I18NService,
        LoginGuard,
        AuthGuard,
        SessionService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
