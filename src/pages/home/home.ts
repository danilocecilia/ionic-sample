import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, Events, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { NavParams } from 'ionic-angular/navigation/nav-params';

import { FooterProvider } from '../../providers/footer/footer';

import { ProtectedPage } from '../protected/protected';
import { ModalNotificationPage } from '../modal-notification/modal-notification';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ProtectedPage {

  username: string;
  todos: any;

  constructor(
    public navCtrl: NavController,
    public footerProvider: FooterProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
    public menu: MenuController) {

    super(navCtrl, navParams, storage)

    this.menu.enable(true);
    this.navCtrl = navCtrl;

    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }


  ionViewWillEnter() {
    this.events.publish('hideHeader', { isHidden: false });
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: false });
  }
}
