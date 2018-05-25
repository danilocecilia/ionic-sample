import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { UserStore  } from "../../stores/user.store";

@IonicPage()
@Component({
  selector: "page-modal-notification",
  templateUrl: "modal-notification.html"
})
export class ModalNotificationPage {
  notification: any;
  currentCulture: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private userStore: UserStore
  ) {
    this.notification = this.navParams.get("notification");
    this.currentCulture = userStore.user.Language.Culture;
  }

  onCloseModal() {
    this.navCtrl.pop();
  }
}
