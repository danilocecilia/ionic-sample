import { Component } from "@angular/core";

@Component({
  selector: "pre-post-test",
  templateUrl: "pre-post-test.html"
})
export class PrePostTestComponent {
  hide: boolean = false;

  constructor() {}

  onClickSubmitEvaluation() {
    debugger;
    this.hide = true;
  }
}
