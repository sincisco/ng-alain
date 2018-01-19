import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {HeaderLogoComponent} from "./components/logo/logo.component";
import {HeaderMenuComponent} from "./components/menu/menu.component";
import {HeaderButtonComponent} from "./components/button/button.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";


const COMPONENTS = [
  HeaderComponent,
  HeaderLogoComponent,
  HeaderMenuComponent,
  HeaderButtonComponent,
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class HeaderModule {
}
