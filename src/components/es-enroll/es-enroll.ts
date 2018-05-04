import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import * as AppConfig from "../../app/config";
import { UserProfileProvider } from "../../providers/user-profile/user-profile";
import { LoadingProvider } from "../../providers/loading/loading";
import { EventSummaryProvider } from "../../providers/event-summary/event-summary";

@Component({
  selector: "es-enroll",
  templateUrl: "es-enroll.html"
})
export class EsEnrollComponent {
  users: any;
  event: any;
  baseUrl = AppConfig.cfg.baseUrl;
  classObj: any;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProfileProvider,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private eventSummaryProvider: EventSummaryProvider
  ) {
    this.event = this.navParams.get("event");

    this.bindAvailableSeats();
  }

  bindAvailableSeats() {
    this.eventSummaryProvider.getClassById(this.event.ClassAPI.ID)
    .then(response => {
      this.classObj = response;
    }).catch(err => {
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

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, {});
  }
}
