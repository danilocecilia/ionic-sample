import { Component } from '@angular/core';
import { ModalNotificationPage } from '../../pages/modal-notification/modal-notification';
import { ModalController } from 'ionic-angular';
/**
 * Generated class for the NotificationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {

  text: string;

  constructor(public modalCtrl: ModalController,) {
    console.log('Hello NotificationsComponent Component');
    this.text = 'Hello World';
  }


  openNotification() {
    let modal = this.modalCtrl.create(ModalNotificationPage);
    modal.present();
  }

}
