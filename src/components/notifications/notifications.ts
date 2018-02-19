import { Component } from "@angular/core";
import { ModalNotificationPage } from "../../pages/modal-notification/modal-notification";
import { ModalController } from "ionic-angular";
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
  constructor(public modalCtrl: ModalController) {}

  openNotification(value) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      idNotification: value
    });
    modal.present();
  }
}
