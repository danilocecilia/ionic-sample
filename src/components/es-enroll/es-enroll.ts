import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Navbar } from "ionic-angular";
import * as AppConfig from "../../app/config";
import { UserProfileProvider } from "../../providers/user-profile/user-profile";
import { LoadingProvider } from "../../providers/loading/loading";
import { EventSummaryProvider } from "../../providers/event-summary/event-summary";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { History } from "../../model/enrollments";
import { ToastProvider } from "../../providers/toast/toast";

@Component({
  selector: "es-enroll",
  templateUrl: "es-enroll.html"
})
export class EsEnrollComponent {
  @ViewChild(Navbar) navBar: Navbar;
  users: any;
  event: any;
  baseUrl = AppConfig.cfg.baseUrl;
  classObj: any;
  history: History;
  constructor(
    private navCtrl: NavController,
    private userProvider: UserProfileProvider,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private eventSummaryProvider: EventSummaryProvider,
    private enrollmentProvider: EnrollmentProvider,
    private toastProvider: ToastProvider
  ) {
    this.event = this.navParams.get("event");

    this.updateAvailableSeats();
  }

  updateAvailableSeats() {
    this.eventSummaryProvider
      .getClassById(this.event.ClassAPI.ID)
      .then(response => {
        this.classObj = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.loadingProvider.presentLoadingDefault();
    this.userProvider
      .loadUsersByClass(this.event.ClassAPI.ID, 1)
      .then(response => {
        this.loadingProvider.dismissLoading();
        this.users = response;
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
      });
  }

  onClickEnrollUser(idUser) {
    this.loadingProvider.presentLoadingDefault();

    this.history = new History();
    this.history.ID_Class = this.event.ClassAPI.ID;
    this.history.ID_User = idUser;

    this.enrollmentProvider
      .enrollUser(this.history)
      .then(response => {
        this.loadingProvider.dismissLoading();
        this.users = this.users.filter(user => user.ID !== idUser);
        this.updateAvailableSeats();
        this.toastProvider.presentTranslatedToast("SuccessEnrolledUser");
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        this.toastProvider.presentTranslatedToast("ErrorMessage");
        console.log(err);
      });

    this.navCtrl.push(EsEnrollComponent, {});
  }

  
  ionViewDidLoad(){
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop();
    }
  }
}
