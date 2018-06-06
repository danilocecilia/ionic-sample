import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  Events,
  ModalController,
  Refresher
} from "ionic-angular";
import { ProtectedPage } from "../protected/protected";
import { PushOptions, PushObject, Push } from "@ionic-native/push";

import { AuthProvider } from "../../providers/auth/auth";
import * as AppConfig from "../../app/config";
import { LoadingProvider } from "../../providers/loading/loading";
import { NotificationProvider } from "../../providers/notification/notification";
import { ModalNotificationPage } from "../modal-notification/modal-notification";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserStore } from "../../stores/user.store";

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
    private push: Push,
    private toastProvider: ToastProvider,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider,
    public userStore: UserStore
  ) {
    super(navCtrl, userStore);

    this.menu.enable(true);

    this.navCtrl = navCtrl;

    this.setupPushNotification();
  }

  ngOnInit() {
    this.loadNotifications(null);
  }

  ionViewWillEnter() {
    this.events.publish("hideHeader", { isHidden: false });
  }

  setupPushNotification() {
    const options: PushOptions = {
      android: {
        senderID: AppConfig.SENDER_ID,
        sound: "true",
        vibrate: "true",
        forceShow: "true"
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => {
      this.userStore.user.DeviceToken = registration.registrationId;

      this.authProvider
        .updateDeviceToken(this.userStore.user)
        .then(() => {
          console.log("Updated DeviceToken :" + registration.registrationId);
        })
        .catch(err =>
          console.error(
            "Error when updating the device token: " +
              registration.registrationId
          )
        );
    });

    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData) {
        let notificationItem = this.notifications.Notifications.find(w => w.ID == notification.additionalData.idNotification);

        if (notificationItem) {
          this.openNotification(notificationItem);
        }
      }
    });
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
    this.loadingProvider.presentLoadingDefault();

    this.notificationProvider
      .loadNotifications()
      .then(notifications => {
        this.loadingProvider.dismissLoading();
        
        this.notifications = notifications;

        this.events.publish("updateBadge", this.notifications.QtyUnread);

        if (refresher) refresher.complete();
      })
      .catch(err => {
        if (AppConfig.hasFoundAPIStatus(err.error)) {
          this.translateProvider
            .translateMessage("ErrorGetNotifications")
            .then(translatedMsg => {
              this.toastProvider.presentToast(translatedMsg);
            });
        }
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
