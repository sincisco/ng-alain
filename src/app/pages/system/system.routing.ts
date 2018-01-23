import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
    data: { text: '用户管理' }
  }
];

export const SystemRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
