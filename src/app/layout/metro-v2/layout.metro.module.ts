import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderModule } from "./header/header.module";
import { ToolbarModule } from "./toolbar/toolbar.module";
import { SidebarModule } from "./sidebar/sidebar.module";
import { LayoutMetroV2Component } from "./layout.metro.component";
import { SharedModule } from '@shared/shared.module';

import { MetroNavComponent } from './nav/nav.component';
import { TileComponent } from './nav/components/tile/tile.component';
import { TileGroupComponent } from './nav/components/tile-group/tile.group.component';
import { TileAreaComponent } from './nav/components/tile-area/tile.area.component';

const NAVCOMPONENT = [
  TileAreaComponent,
  TileGroupComponent,
  TileComponent,
  MetroNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HeaderModule,
    ToolbarModule,
    SidebarModule
  ],
  declarations: [
    ...NAVCOMPONENT,
    LayoutMetroV2Component
  ],
  exports: [
    LayoutMetroV2Component,
  ]
})
export class LayoutMetroV2Module {
}
