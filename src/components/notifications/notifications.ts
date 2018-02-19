import { Component } from "@angular/core";
import { ModalNotificationPage } from "../../pages/modal-notification/modal-notification";
import { ModalController } from "ionic-angular";
import { NotificationProvider } from "../../providers/notification/notification";
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
export class NotificationsComponent {
  notifications: any = [];

  constructor(
    public modalCtrl: ModalController,
    private notificationProvider: NotificationProvider
  ) {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifications = this.notificationProvider
      .loadNotifications()
      .subscribe(res => {
        this.notifications = res[0];
      });
    // .toPromise()
    // .then(res => {
    //   this.notifications = res[0];
    //   this.notificationProvider.notifications = res[0];
    // });
  }

  openNotification(value) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: value
    });
    modal.present();
  }
}
