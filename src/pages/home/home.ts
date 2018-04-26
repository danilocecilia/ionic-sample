import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  Events,
  ModalController,
  Refresher
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { ProtectedPage } from "../protected/protected";
import { AuthProvider } from "../../providers/auth/auth";
import * as APPConfig from "../../app/config";
import { LoadingProvider } from "../../providers/loading/loading";
import { NotificationProvider } from "../../providers/notification/notification";
import { ModalNotificationPage } from "../modal-notification/modal-notification";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends ProtectedPage implements OnInit {
  //username: string;
  todos: any;
  isButtonsHidden: boolean = true;
  notifications: any = [];

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private events: Events,
    private modalCtrl: ModalController,
    private menu: MenuController,
    private authProvider: AuthProvider,
    private toastProvider: ToastProvider,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider
  ) {
    super(navCtrl, storage);

    this.menu.enable(true);
    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadNotifications(null);
  }

  ionViewWillEnter() {
    this.events.publish("hideHeader", { isHidden: false });
  }

  ionViewDidLoad() {}

  viewDidLeave() {
    this.events.publish("hideHeader", { isHidden: true });
  }

  userHasPermission() {
    let user = this.authProvider.loggedUser;

    if (user.Permissions) {
      user.Permissions.find(element => {
        let permission = APPConfig.APIPermission[element];

        if (permission === "GPS" || permission === "DASHBOARD") {
          this.isButtonsHidden = false;
        }
      });
    }
  }

  doRefresh(refresher?: Refresher) {
    //console.log("DOREFRESH", refresher);
    this.loadNotifications(refresher);
  }

  doPulling(refresher: Refresher) {
    console.log("DOPULLING", refresher.progress);
  }

  loadNotifications(refresher: Refresher) {
    this.notificationProvider
      .loadNotifications()
      .then(res => {
        this.loadingProvider.dismissLoading();
        this.notifications = this.notificationProvider.notification = res;
        this.events.publish("updateBadge", this.notifications.QtyUnread);
        refresher.complete();
      })
      .catch(err => {
        if (APPConfig.hasFoundAPIStatus(err.error)) {
          this.translateProvider
            .translateMessage("ErrorGetNotifications")
            .then(translatedMsg => {
              this.toastProvider.presentToast(translatedMsg);
            });
        }
        this.loadingProvider.dismissLoading();
      });
  }

  openNotification(notificationItem) {
    this.notificationProvider
      .setNotificationRead(notificationItem.ID)
      .then(() => {
        this.openModal(notificationItem);
      })
      .catch(error => {
        console.log("Error when update read notification: " + error);
      });
  }

  openModal(notificationItem) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: notificationItem
    });

    modal.onDidDismiss(() => {
      this.loadNotifications(null);
    });

    modal.present();
  }
}
