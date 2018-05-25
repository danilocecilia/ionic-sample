import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  Events,
  ModalController,
  Refresher
} from "ionic-angular";
import { ProtectedPage } from "../protected/protected";
import { AuthProvider } from "../../providers/auth/auth";
import * as APPConfig from "../../app/config";
import { LoadingProvider } from "../../providers/loading/loading";
import { NotificationProvider } from "../../providers/notification/notification";
import { ModalNotificationPage } from "../modal-notification/modal-notification";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserStore  } from "../../stores/user.store";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends ProtectedPage implements OnInit {
  isButtonsHidden: boolean = true;
  notifications: any = [];

  constructor(
    public navCtrl: NavController,
    private events: Events,
    private modalCtrl: ModalController,
    private menu: MenuController,
    private authProvider: AuthProvider,
    private toastProvider: ToastProvider,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider,
    public userStore: UserStore
  ) {
    super(navCtrl, userStore);

    this.menu.enable(true);

    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    this.loadNotifications(null);
  }

  ionViewWillEnter() {
    this.events.publish("hideHeader", { isHidden: false });
  }

  viewDidLeave() {
    this.events.publish("hideHeader", { isHidden: true });
  }

  doRefresh(refresher?: Refresher) {
    this.loadNotifications(refresher);
  }

  doPulling(refresher: Refresher) {
    console.log("DOPULLING", refresher.progress);
  }

  loadNotifications(refresher: Refresher) {
    this.notificationProvider.loadNotifications()
      .then(notifications => {
        this.notifications = notifications;
        
        this.events.publish("updateBadge", this.notifications.QtyUnread);

        if(refresher)
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
      });
  }

  openNotification(notificationItem) {
    this.notificationProvider.setNotificationRead(notificationItem.ID)
      .then(() => {
        this.openModal(notificationItem);
      })
      .catch(error => {
        console.log("Error when update read notification: " + error);
      });
  }

  openModal(notificationItem) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {notification: notificationItem});

    modal.onDidDismiss(() => {
      this.loadNotifications(null);
    });

    modal.present();
  }
}
