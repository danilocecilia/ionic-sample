import { Component } from "@angular/core";
import { IonicPage,NavController,NavParams,ViewController } from "ionic-angular";
import { NotificationProvider } from "../../providers/notification/notification";
import { AuthProvider } from "../../providers/auth/auth";
@IonicPage()
@Component({
  selector: "page-modal-notification",
  templateUrl: "modal-notification.html"
})
export class ModalNotificationPage {
  notification: any;
  currentCulture: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private notificationProvider: NotificationProvider,
    private authProvider: AuthProvider
  ) {
    this.notification = this.navParams.get("notification");

    this.currentCulture = this.authProvider.loggedUser.Language.Culture;
  }

  onCloseModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalNotificationPage");
  }
}
