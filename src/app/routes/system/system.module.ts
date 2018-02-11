import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';

import { OrgComponent } from './org/org.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';


@NgModule({
    imports: [
        SystemRoutingModule
    ],
    exports: [],
    declarations: [
        UserComponent,
        RoleComponent,
        OrgComponent
    ],
    providers: [],
})
export class SystemModule { }
