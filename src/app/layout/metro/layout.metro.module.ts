import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

import {HeaderModule} from "./header/header.module";
import {MenuModule} from "./menu.metro/menu.module";
import {ToolbarModule} from "./toolbar/toolbar.module";
import {SidebarModule} from "./sidebar/sidebar.module";
import {LayoutMetroComponent} from "./layout.metro.component";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "../../../platform/shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,

    HeaderModule,
    MenuModule,
    ToolbarModule,
    SidebarModule],
  declarations: [
    LayoutMetroComponent
  ],
  exports: [
  LayoutMetroComponent,
    MenuModule,
      SharedModule
  ]
})
export class LayoutMetroModule {
}
