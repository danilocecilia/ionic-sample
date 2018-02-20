import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { getNonHydratedSegmentIfLinkAndUrlMatch } from "ionic-angular/navigation/url-serializer";
import { NotificationProvider } from "../../providers/notification/notification";

/**
 * Generated class for the ModalNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-notification",
  templateUrl: "modal-notification.html"
})
export class ModalNotificationPage {
  notification: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private notificationProvider: NotificationProvider
  ) {
    this.notification = this.navParams.get("notification");
  }

  onCloseModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalNotificationPage");
  }
}
