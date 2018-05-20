import { Component, OnInit } from "@angular/core";
import { PrePostTestComponent } from "../../components/pre-post-test/pre-post-test";
import { NavController, NavParams, App } from "ionic-angular";
import * as AppConfig from "../../app/config";
import { TranslateProvider } from "../../providers/translate/translate";
@Component({
  selector: "assessment",
  templateUrl: "assessment.html"
})
export class AssessmentComponent implements OnInit {
  idCompetency: any;
  stepType: any;
  trainingName: number;
  assessmentType: string;
  msg1:string;
  
  constructor(private navCtrl: NavController, private navParam: NavParams, private translateProvider: TranslateProvider) {}

  ngOnInit() {
    this.trainingName = this.navParam.get("trainingName");
    this.idCompetency = this.navParam.get('idCompetency');
    this.stepType = this.navParam.get("Type");
    this.getStepType(this.stepType);
  }

  getStepType(stepType) {
    switch (stepType) {
      case AppConfig.StepType.PRE_TEST:
        this.assessmentType = "PreTestAssessment";
        this.translateProvider.translateMessage(this.assessmentType)
        .then(translatedMSG => {
          this.translateProvider.translateMessageWithParam("AssessmentMsg1", translatedMSG)
          .then(t => {
            this.msg1 = t;
          });
        })
        break;
      case AppConfig.StepType.POST_TEST:
        this.assessmentType = "PostTestAssessment";
        break;
    }
  }

  onClickOpenAssessment() {
    this.navCtrl.push(PrePostTestComponent, { assessmentType : this.assessmentType, idCompetency : this.idCompetency});
  }
}
