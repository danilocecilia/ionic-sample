import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalNotificationPage } from "../../pages/modal-notification/modal-notification";
import { ModalController, Refresher, Content, Events } from "ionic-angular";
import { NotificationProvider } from "../../providers/notification/notification";
import { LoadingProvider } from "../../providers/loading/loading";
import { ToastProvider } from "../../providers/toast/toast";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: "notifications",
  templateUrl: "notifications.html"
})
export class NotificationsComponent implements OnInit {
  @ViewChild(Content) content: Content;
  notifications: any = [];

  constructor(
    public modalCtrl: ModalController,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private authProvider: AuthProvider,
    private events: Events
  ) { }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadNotifications(null);
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
        if (AppConfig.hasFoundAPIStatus(err.error))
          this.authProvider.logout(err.error);

        // this.toastProvider.presentToast("Erro ao carregar as notificações.");
        //this.loadingProvider.dismissLoading();
      });
  }

  openNotification(notificationItem) {
    this.notificationProvider
      .setNotificationRead(notificationItem.ID)
      .then(() => {
        this.openModal(notificationItem);
      })
      .catch(error => {
        console.log("Error when updating read notification: " + error);
      });
  }

  openModal(notificationItem) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: notificationItem
    });

    modal.onDidDismiss(() => {
      this.loadNotifications(null);
    })

    modal.present();
  }
}
