import { Component, OnInit } from "@angular/core";
import { ModalNotificationPage } from "../../pages/modal-notification/modal-notification";
import { ModalController, Loading, ToastController } from "ionic-angular";

import { NotificationProvider } from "../../providers/notification/notification";

import { LoadingProvider } from "../../providers/loading/loading";
import { ToastProvider } from "../../providers/toast/toast";
/**
 * Generated class for the NotificationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "notifications",
  templateUrl: "notifications.html"
})
export class NotificationsComponent implements OnInit {
  notifications: any = [];

  constructor(
    public modalCtrl: ModalController,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider
  ) {}

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationProvider.loadNotifications().then(
      res => {
        this.loadingProvider.loading.dismiss();
        this.notifications = res;
      },
      err => {
        this.toastProvider.presentToast("Erro ao carregar as notificações.");
        this.loadingProvider.loading.dismiss();
      }
    );
  }

  openNotification(value) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: value
    });
    modal.present();
  }
}
