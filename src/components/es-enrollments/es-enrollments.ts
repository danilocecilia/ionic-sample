import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, NavParams, Navbar } from "ionic-angular";
import { EsEnrollComponent } from "../es-enroll/es-enroll";
import { LoadingProvider } from "../../providers/loading/loading";
import * as AppConfig from "../../app/config";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { ToastProvider } from "../../providers/toast/toast";
import { EventSummaryComponent } from "../event-summary/event-summary";
import { EventSummaryProvider } from "../../providers/event-summary/event-summary";

@Component({
  selector: "es-enrollments",
  templateUrl: "es-enrollments.html"
})
export class EsEnrollmentsComponent implements OnInit {
  @ViewChild(Navbar) navBar: Navbar;
  enrollments: any = {};
  baseUrl = AppConfig.cfg.baseUrl;
  enrollment: any;

  constructor(
    private navCtrl: NavController,
    private loadingProvider: LoadingProvider,
    private navParams: NavParams,
    private enrollmentProvider: EnrollmentProvider,
    private toastProvider: ToastProvider,
    private eventSummaryProvider : EventSummaryProvider
  ) {
    this.enrollments = this.navParams.get("enrollments");
  }

  ngOnInit() {}

  remove(event) {
    this.loadingProvider.presentLoadingDefault();
    
    this.enrollment = {
      ID_History: event.ID_History
    };
    
    this.enrollmentProvider
      .removeEnrollment(this.enrollment)
      .then(status => {
        this.loadingProvider.dismissLoading();
        if(status === "SUCCESS"){
          this.enrollments.Histories = this.enrollments.Histories.filter(element => element.ID_History !== event.ID_History);
          this.updateAvailableSeats();
          this.toastProvider.presentTranslatedToast("SuccessRemovalEnrollment");
        }
      })
      .catch(err => {
        console.log(err);
        this.loadingProvider.dismissLoading();
        this.toastProvider.presentTranslatedToast("ErrorMessage");
      });
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, { event: this.enrollments });
  }

  updateAvailableSeats() {
    this.eventSummaryProvider
      .getClassById(this.enrollments.ClassAPI.ID)
      .then(response => {
        this.enrollments.ClassAPI = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop();
    }
  }

  ionViewDidEnter(){
    this.enrollmentProvider.loadEnrollmentsByClass(this.enrollments.ClassAPI.ID)
    .then(response => {
      this.enrollments = response;
    }).catch(err => {console.log(err)});
  }
}
