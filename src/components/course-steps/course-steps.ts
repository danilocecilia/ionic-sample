import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { AssessmentComponent } from "../assessment/assessment";
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent  } from "../../components/timeline/timeline";

@Component({
  selector: "course-steps",
  templateUrl: "course-steps.html"
})
export class CourseStepsComponent {
  items = [
    {
      title: 'Pre-Test',
      content: `You must answer a pre test assessment for this training.`,
      icon: 'calendar',
      time: { title: 'PRE-TEST' },
      enable: true
    },
    {
      title: 'Training Content',
      content: `You can access the training content by clicking here!`,
      icon: 'calendar',
      time: { title: 'TRAINING CONTENT' },
      enable: false
    },
    {
      title: 'Post-Test',
      content: `You must answer a pre test assessment for this training.`,
      icon: 'calendar',
      time: { title: 'POST-TEST' },
      enable: false
    },
    {
      title: 'Certificate',
      content: `Get your certificate for the course.`,
      icon: 'calendar',
      time: { title: 'CERTIFICATE' },
      enable: false
    }
  ];

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
