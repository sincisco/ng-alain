import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgComponent } from './org/org.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [RouterModule.forChild(
        [
            {path: 'user', component: UserComponent},
            {path: 'role', component: RoleComponent},
            {path: 'org', component: OrgComponent}
        ]
    )],
    exports: [
        RouterModule
    ]
})
export class SystemRoutingModule { }
