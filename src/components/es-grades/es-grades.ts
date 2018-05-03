import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular";
import * as AppConfig from "../../app/config";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "es-grades",
  templateUrl: "es-grades.html"
})
export class EsGradesComponent implements OnInit {
  enrollments: any = {};
  baseUrl = AppConfig.cfg.baseUrl;
  grades: number[];
  gradeHistories: any[];

  constructor(
    private navParams: NavParams,
    private enrollmentProvider: EnrollmentProvider,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider
  ) {}

  ngOnInit() {
    this.enrollments = this.navParams.get("enrollments");

    this.getGradeList();
  }

  updateGradeHistory() {
    this.loadingProvider.presentLoadingDefault();
    this.enrollmentProvider
      .updateGrades(this.enrollments.Histories)
      .then(histories => {
        this.loadingProvider.dismissLoading();
        this.enrollments = histories;
        this.toastProvider.presentTranslatedToast("SuccessUpdateGradeHistory");
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
        this.toastProvider.presentTranslatedToast("ErrorMessage");
        
      });
  }

  getGradeList() {
    if (AppConfig.GradeScale.GRADE_0_100 === this.enrollments.GradingScale) {
      this.grades = Array.from(Array(101).keys());
    } else if (
      AppConfig.GradeScale.GRADE_0_10 === this.enrollments.GradingScale
    ) {
      this.grades = Array.from(Array(11).keys());
    }
  }
}
