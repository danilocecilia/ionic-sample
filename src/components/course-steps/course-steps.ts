import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { AssessmentComponent } from "../assessment/assessment";

/**
 * Generated class for the CourseStepsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "course-steps",
  templateUrl: "course-steps.html"
})
export class CourseStepsComponent {
  constructor(private navCtrl: NavController) {

  }

  startAssessment() {
    this.navCtrl.push(AssessmentComponent, {});
  }
}
