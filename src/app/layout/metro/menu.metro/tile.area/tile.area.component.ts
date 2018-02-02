import {Component, ElementRef, Input} from "@angular/core";
import {LayoutMetroComponent} from "../../layout.metro.component";

@Component({
  selector: "tile-area",
  templateUrl: "./tile.area.component.html",
  host: {
    "[class]": "_class"
  }
})
export class TileAreaComponent {
  $element: JQuery;

  @Input("title")
  title: string = "未知标题";

  constructor(private _elementRef: ElementRef,
              public layout: LayoutMetroComponent) {
    this.$element = $(this._elementRef.nativeElement);
  }

  _class = "tile-area fg-white";

  ngAfterViewInit() {
    this.$element.click((event) => {
      if ($(event.target).is("tile-area,tile-group")) {
        this.layout.hideMenuPanel();
      }
    });
  }
}



