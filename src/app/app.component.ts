import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ModalJobrolePage } from '../pages/modal-jobrole/modal-jobrole'

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  public rootPage: any = HomePage;

  public isHidden: boolean = true;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    public modalController: ModalController,
    public authProvider: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.authProvider.startupTokenRefresh();

      // //This if for hide footer from LoginPage
      // events.subscribe('hideHeader', (data) => {
      //   this.isHidden = data.isHidden;
      // })
    });
  }

  openModal() {
    let myModal = this.modalController.create(ModalJobrolePage);
    myModal.present();
  }
}

