import { Component, OnInit } from "@angular/core";
import { ModalNotificationPage } from "../../pages/modal-notification/modal-notification";
import { ModalController } from "ionic-angular";

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
  notifications: any = [];
  //private apiStatus: any;
  //private cfg: any;
  constructor(
    public modalCtrl: ModalController,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private authProvider: AuthProvider
  ) {}

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationProvider
      .loadNotifications()
      .then(res => {
        this.loadingProvider.loading.dismiss();
        this.notifications = res;
      })
      .catch(err => {
        if (AppConfig.hasFoundAPIStatus(err.error)) this.authProvider.logout(err.error);

        // this.toastProvider.presentToast("Erro ao carregar as notificações.");
        //this.loadingProvider.loading.dismiss();
      });
  }

  openNotification(value) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: value
    });
    modal.present();
  }
}
