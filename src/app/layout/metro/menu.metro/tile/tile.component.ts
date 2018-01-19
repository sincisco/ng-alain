import {Component, ElementRef, Input, HostListener, HostBinding, AfterViewInit} from "@angular/core";
import {Tile} from "./IRectangle";
import {Router} from "@angular/router";
import {LayoutMetroComponent} from "../../layout.metro.component";
import {MenuService} from "@microon/theme";

@Component({
  selector: "tile",
  templateUrl: "./tile.component.html",
  host: {
    "[class]": "_class"
  }
})
export class TileComponent extends Tile implements AfterViewInit {

  $element: JQuery;
  _currentIndex = 0;
  _frames: any;
  _interval: any;
  _size: {
    width: number,
    height: number
  };

  @HostBinding("class.element-selected")
  get selected(): boolean {
    if (this.menuService) {
      return this.$element.data("menuTarget") === this.menuService.currentMenu;
    }

  }

  @Input()
  effect = "slideLeft";
  @Input()
  period = 4000;
  @Input()
  duration = 700;
  @Input()
  easing = "swing";

  constructor(private _elementRef: ElementRef,
              private menuService: MenuService,
              private layout: LayoutMetroComponent,
              private router: Router) {
    super();
    this.$element = $(this._elementRef.nativeElement);
  }

  @HostListener("click", ["$event.target"])
  onClick(div: HTMLElement) {
    const menuTarget = this.$element.data("menuTarget");
    if (menuTarget) {
      this.layout.hideMenuPanel();
      this.router.navigateByUrl(this.menuService.getLink(menuTarget))
        .then(() => {
          this.menuService.currentMenu = menuTarget;
      });
    }
  }


  ngAfterViewInit() {
    const $imageArray = this.$element.find("img[data-role=fitImage]");
    $imageArray.each((index, image) => {
      this.fitImage($(image));
    });

    this._create();
  }

  _create() {
    this._createTransformTile();
    this._createLiveTile();
  }

  _createLiveTile() {
    const $element = this.$element;

    this._frames = $element.find(".live-slide");
    if (this._frames.length <= 1) {
      return false;
    }

    this._size = {
      "width": $element.width(),
      "height": $element.height()
    };

    $element.on("mouseenter", () => {
      this.stop();
    });

    $element.on("mouseleave", () => {
      this.start();
    });

    this.start();
  }


  start() {
    this._interval = setInterval(() => {
      this._animate();
    }, this.period);
  }

  stop() {
    this._interval&&clearInterval(this._interval);
  }

  _animate() {
    const currentFrame = this._frames[this._currentIndex];
    this._currentIndex++;
    this._currentIndex = this._currentIndex >= this._frames.length ? 0 : this._currentIndex;
    const nextFrame = this._frames[this._currentIndex];

    switch (this.effect) {
      case "slideLeft":
        this._effectSlideLeft(currentFrame, nextFrame);
        break;
      case "slideRight":
        this._effectSlideRight(currentFrame, nextFrame);
        break;
      case "slideDown":
        this._effectSlideDown(currentFrame, nextFrame);
        break;
      default:
        this._effectSlideUp(currentFrame, nextFrame);
    }
  }

  _effectSlideUp(currentFrame, nextFrame) {
    const _out = this._size.height,
      options = {
        duration: this.duration,
        easing: this.easing
      };

    $(currentFrame)
      .animate({top: -_out}, options);
    $(nextFrame)
      .css({top: _out})
      .show()
      .animate({top: 0}, options);
  }

  _effectSlideDown(currentFrame, nextFrame) {
    const _out = this._size.height,
      options = {
        duration: this.duration,
        easing: this.easing
      };

    $(currentFrame)
      .animate({top: _out}, options);
    $(nextFrame)
      .css({top: -_out})
      .show()
      .animate({top: 0}, options);
  }

  _effectSlideLeft(currentFrame, nextFrame) {
    const _out = this._size.width,
      options = {
        duration: this.duration,
        easing: this.easing
      };

    $(currentFrame)
      .animate({left: _out * -1}, options);
    $(nextFrame)
      .css({left: _out})
      .show()
      .animate({left: 0}, options);
  }

  _effectSlideRight(currentFrame, nextFrame) {
    const _out = this._size.width,
      options = {
        duration: this.duration,
        easing: this.easing
      };

    $(currentFrame)
      .animate({left: _out}, options);
    $(nextFrame)
      .css({left: -_out})
      .show()
      .animate({left: 0}, options);
  }

  _createTransformTile() {
    const $element = this.$element,
      dim = {w: $element.width(), h: $element.height()};

    $element.on("mousedown", function (e) {
      const X = e.pageX - $(this).offset().left,
        Y = e.pageY - $(this).offset().top;
      let transform = "top";

      if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
        transform = "left";
      } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
        transform = "right";
      } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
        transform = "bottom";
      }

      $(this).addClass("tile-transform-" + transform);
    });

    $element.on("mouseup mouseleave", function () {
      $(this)
        .removeClass("tile-transform-left tile-transform-top tile-transform-right tile-transform-bottom");
    });
  }

  imageOptions: any = {
    shadow: false,
    overlay: false,
    type: "default",
    frameColor: "default",
    format: "fill" // 'sd'
  };

  fitImage($image) {
    const element = $image,
      o = this.imageOptions;
    var $parent = element.parent();
    var div, src = element.attr("src");

    var image_container = $("<div/>")
      .addClass("image-container")
      .css("width", "100%")
      .css("height", "100%")
      .appendTo($parent);
    var image_frame = $("<div/>")
      .addClass("frame")
      .appendTo(image_container);

    div = $("<div/>").css({
      "width": "100%",
      "height": "100%",
      "background-image": "url(" + src + ")",
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "border-radius": "0"
    });


    if (o.shadow !== false) {
      image_container.addClass("block-shadow");
    }
    div.appendTo(image_frame);

    image_container.addClass("image-format-" + o.format);
    element.remove();
  }
}



