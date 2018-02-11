import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { HeaderLogoComponent } from "./components/logo/logo.component";
import { HeaderMenuComponent } from "./components/menu/menu.component";
import { HeaderButtonComponent } from "./components/button/button.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from '@shared/shared.module';
import { HeaderFullScreenComponent } from './components/button/fullscreen.component';
import { HeaderI18nComponent } from './components/button/i18n.component';
import { HeaderThemeComponent } from './components/button/theme.component';
import { HeaderStorageComponent } from './components/button/storage.component';

const COMPONENTS = [
  HeaderComponent,
  HeaderLogoComponent,
  HeaderMenuComponent,
  HeaderButtonComponent,
  HeaderFullScreenComponent,
  HeaderI18nComponent,
  HeaderThemeComponent,
  HeaderStorageComponent
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
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
