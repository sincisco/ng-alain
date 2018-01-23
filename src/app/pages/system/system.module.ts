import {NgModule} from "@angular/core";
import {SystemRoutingModule} from "./system.routing";
import {SharedModule} from '@shared/shared.module';
import {UserComponent} from './user/user.component';
import {UserService} from './user/user.service';

@NgModule({
    imports: [
        SharedModule,
        SystemRoutingModule
    ],
    declarations: [
        UserComponent
    ],
    entryComponents: [
        UserComponent
    ],
    providers:[
        UserService
    ],
    exports: [
        UserComponent
    ]
})
export class SystemModule {
  constructor() {
  }
}
