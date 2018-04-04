import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { AssessmentComponent } from "../../components/assessment/assessment";

@Component({
  selector: "modal-course-steps",
  templateUrl: "modal-course-steps.html"
})
export class ModalCourseStepsComponent {
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

  onCloseModal() {
    this.navCtrl.pop();
  }
}
