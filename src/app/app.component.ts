import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { ModalJobrolePage } from '../pages/modal-jobrole/modal-jobrole'
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { AuthProvider } from '../providers/auth/auth';
import { FooterProvider } from '../providers/footer/footer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  public footerIsHidden: boolean = true;

  pages: Array<{ title: string, component: any, method?: any }>;

  constructor(
    platform                : Platform,
    statusBar               : StatusBar,
    splashScreen            : SplashScreen,
    public footerProvider   : FooterProvider,
    public events           : Events,
    public modalController  : ModalController,
    public authProvider     : AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.authProvider.startupTokenRefresh();

      //This if for hide footer from LoginPage
      events.subscribe('hideHeader', (data) => {
        this.footerIsHidden = data.isHidden;
      })
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Change Password', component: 'ChangePasswordPage'},
      { title: 'Logout', component: 'AuthPage', method: 'logout' }
    ];
  }

  openModal() {
    let myModal = this.modalController.create(ModalJobrolePage);
    myModal.present();
  }

  checkPreviousAuthoziation(): void {
    if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
      (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = AuthPage;
    } else {
      this.rootPage = HomePage;
    }
  }

  openPage(page) {
    if (page.method && page.method === 'logout') {
      this.authProvider.logout();
    }

    this.nav.push(page.component);
  }
}

