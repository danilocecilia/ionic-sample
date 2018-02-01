import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, Events } from 'ionic-angular';
import { FooterProvider } from '../../providers/footer/footer';
import { Storage } from '@ionic/storage';

import { AuthPage } from '../auth/auth';
import { ProtectedPage } from '../protected/protected';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ProtectedPage{

  username: string;
  todos: any;

  constructor(
    public navCtrl:       NavController, 
    public footerProvider: FooterProvider, 
    public navParams:     NavParams,
    public alertCtrl:     AlertController,
    public storage:       Storage,
    public events:        Events,
    public menu:          MenuController) {

    super(navCtrl, navParams, storage)

    this.menu.enable(true);
    this.navCtrl = navCtrl;

    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }
  
  ionViewWillEnter(){
    this.events.publish('hideHeader', { isHidden: false});
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: false});
  }
}
