import {NgModule} from "@angular/core";
import {TileGroupComponent} from "./tile.group/tile.group.component";
import {TileAreaComponent} from "./tile.area/tile.area.component";
import {TileComponent} from "./tile/tile.component";

const COMPONENTS = [
  TileComponent,
  TileGroupComponent,
  TileAreaComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class MenuModule {
}
