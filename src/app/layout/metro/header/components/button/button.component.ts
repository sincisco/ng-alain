import {Component} from "@angular/core";

@Component({
  selector: "header-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.less"]
})
export class HeaderButtonComponent {
  constructor() {
  }

  toggle() {
    $("app-layout").toggleClass("aside-expanded");
  }
}
