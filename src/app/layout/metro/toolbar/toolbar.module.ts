import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarComponent} from "./toolbar.component";
import {ToolbarBreadcrumbComponent} from "./breadcrumb/breadcrumb.component";

const COMPONENTS = [
  ToolbarComponent,
  ToolbarBreadcrumbComponent
];

@NgModule({
  imports: [
    BrowserModule],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  providers:[
  ]
})
export class ToolbarModule {
}
