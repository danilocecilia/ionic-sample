import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { EsEnrollComponent } from "../es-enroll/es-enroll";
import { LoadingProvider } from "../../providers/loading/loading";
import * as AppConfig from "../../app/config";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { GradeHistory } from "../../model/enrollments";
import { ToastProvider } from "../../providers/toast/toast";


@Component({
  selector: "es-enrollments",
  templateUrl: "es-enrollments.html"
})
export class EsEnrollmentsComponent implements OnInit {
  enrollments: any = {};
  baseUrl = AppConfig.cfg.baseUrl;
  enrollment: any;

  constructor(
    private navCtrl: NavController,
    private loadingProvider: LoadingProvider,
    private navParams: NavParams,
    private enrollmentProvider: EnrollmentProvider,
    private toastProvider: ToastProvider
  ) {
    this.enrollments = this.navParams.get("enrollments");
  }

  ngOnInit() {}

  remove(event) {
    this.enrollment = {
      ID_History: event.ID
    };
    
    this.enrollmentProvider
      .removeEnrollment(this.enrollment)
      .then(status => {
        if(status === "SUCCESS"){
          this.enrollments.Histories = this.enrollments.Histories.filter(element => element.ID !== event.ID);
          this.toastProvider.presentTranslatedToast("SuccessRemovalEnrollment");
        }
      })
      .catch(err => {
        this.toastProvider.presentTranslatedToast("ErrorMessage");
      });
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, { event: this.enrollments });
  }
}
