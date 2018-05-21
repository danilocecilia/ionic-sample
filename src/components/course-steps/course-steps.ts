import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AssessmentComponent } from "../assessment/assessment";
import { TrainingStepsProvider } from "../../providers/training-steps/training-steps";

@Component({
  selector: "course-steps",
  templateUrl: "course-steps.html"
})
export class CourseStepsComponent implements OnInit {
  idCompetency: any;
  tSteps: any;
  trainingName: string;
  idTraining : number;
  ngOnInit() {
    this.idTraining = this.navParam.get('idTraining');
    this.trainingName = this.navParam.get('trainingName');
    this.idCompetency = this.navParam.get('idCompetency');
    
    this.trainingSteps
      .loadSteps(this.idTraining)
      .then(response => {
        this.tSteps = response;
      })
      .catch(err => console.log(err));
  }

  constructor(
    private navCtrl: NavController,
    private trainingSteps: TrainingStepsProvider,
    private navParam : NavParams
  ) {}

  startAssessment(step) {
    this.navCtrl.push(AssessmentComponent, { trainingName : this.trainingName, idTraining: this.idTraining, Type: step.Type, idCompetency: this.idCompetency });
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
