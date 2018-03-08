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
  constructor(private navCtrl: NavController) {}

  startAssessment() {
    this.navCtrl.push(AssessmentComponent, {});
  }

  onCLickStartTraining() {
    window.open(
      "http://www.treinamentoford.com.br/Pages/LMS/RenderCourse?ID=NzgjODk3Ng==&guid=5746e77d-2a43-4e0e-9b4c-8399ce4aa078&displayurl=ID=78&urlReturn=/treinamentos/elearning/78",
      "_system",
      "location=no"
    );
    return false;
  }
}
