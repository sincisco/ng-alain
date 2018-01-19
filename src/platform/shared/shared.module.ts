import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenuTargetDirective} from "./directives/menu-target";
import {AvatarComponent} from "./components/avatar/avatar.component";
import {CoreModule} from "../core/core.module";


const PIPES = [];

const viewClassArray = [
  MenuTargetDirective,
  AvatarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
      CoreModule
  ],
  declarations: [
    ...viewClassArray,
    ...PIPES
  ],
  providers:[
  ],
  exports: [
    ...viewClassArray,
    ...PIPES
  ]
})
export class SharedModule {

}
