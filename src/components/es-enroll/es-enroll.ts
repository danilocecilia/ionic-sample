import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import * as AppConfig from "../../app/config";
import { UserProfileProvider } from "../../providers/user-profile/user-profile";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "es-enroll",
  templateUrl: "es-enroll.html"
})
export class EsEnrollComponent {
  users: any;
  event: any;
  baseUrl = AppConfig.cfg.baseUrl;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProfileProvider,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider
  ) {
    this.event = this.navParams.get("event");
  }

  ngOnInit() {
    this.loadEnrollments();
  }
  loadEnrollments() {
    this.loadingProvider.presentLoadingDefault();
    this.userProvider
      .loadUsersByClass(this.event.ClassAPI.ID)
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
