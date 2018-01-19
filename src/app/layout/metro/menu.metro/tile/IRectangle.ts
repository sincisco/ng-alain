import {Input, HostBinding, OnInit} from "@angular/core";

export const typeSizeXMap = {
  "tile-small": 1,
  "tile": 2,
  "tile-square": 2,
  "tile-wide": 4,
  "tile-large": 4
};

export const typeSizeYMap = {
  "tile-small": 1,
  "tile": 2,
  "tile-square": 2,
  "tile-wide": 2,
  "tile-large": 4
};

export interface IRectangle {
  getType(): any;

  enable(): boolean;

  width(): number;

  height(): number;

  offset(x: number, y: number);
}

export type TileType = "tile-small" | "tile" | "tile-square" | "tile-wide" | "tile-large";

export abstract class Tile implements IRectangle, OnInit {
  @HostBinding("class.custom-tile") customTile = true;
  $element: JQuery;
  @Input()
  size: TileType = "tile";
  @Input("bg")
  bg: string;
  @Input("fg")
  fg: string;

  _class = "";

  getType(): any {
    return (this.size === "tile-square") ? "tile" : this.size;
  }

  enable() {
    return true;
  }

  width() {
    return typeSizeXMap[this.size];
  }

  height() {
    return typeSizeYMap[this.size];
  }

  offset(x: number, y: number) {
    this.$element.css({
      left: 80 * x + 5,
      top: 80 * y + 5
    });
  }

  ngOnInit() {
    this._setClass();
  }

  _setClass(): void {
    const array = [];
    array.push(this.size);
    this.bg && array.push(this.bg);
    this.fg && array.push(this.fg);

    this._class = array.join(" ");
  }

}
