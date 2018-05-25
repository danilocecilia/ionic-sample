import { Component, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import {
  Platform,
  NavController,
  AlertController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization";
import { PushOptions, PushObject, Push } from "@ionic-native/push";
import * as AppConfig from "../app/config";

import { AuthProvider } from "../providers/auth/auth";
import { TabsPage } from "../pages/tabs/tabs";
import { AuthPage } from "../pages/auth/auth";
import { UserStore } from "../stores/user.store";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  currentUser: any;
  showSplash = true;
  @ViewChild("content") nav: NavController;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private translate: TranslateService,
    private globalization: Globalization,
    private push: Push,
    private alertCtrl: AlertController,
    private userStore: UserStore
  ) {
    platform.ready().then(() => {
      this.initializeAplication(statusBar, splashScreen);
    });
  }

  initializeAplication(statusBar, splashScreen){
    statusBar.backgroundColorByHexString(AppConfig.COLORS.darkblue);

    splashScreen.hide();

    this.currentUser = this.userStore.user;

    this.authProvider.startupTokenRefresh();

    this.setupPushNotification();

    this.loadDefaultLanguage();

    this.redirectToPage();

    this.showSplash = false;
  }

  setupPushNotification() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => {});

    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: notification.label,
          message: notification.message
        });
        youralert.present();
      }
    });
  }

  redirectToPage() {
    if (this.currentUser) {
      this.nav.setRoot(TabsPage);
    } else {
      this.nav.setRoot(AuthPage);
    }
  }

  loadDefaultLanguage() {
    let user = this.currentUser;

    if (user) {
      if (user.Language && user.Language.Culture) {
        let prefix = user.Language.Culture.substring(0, 2);

        this.setLanguage(prefix);
      } else {
        this.setLanguage(AppConfig.CULTURES.english);
      }
    } else {
      this.setDefaultLanguage();
    }
  }

  setDefaultLanguage() {
    this.globalization
      .getPreferredLanguage()
      .then(language => {
        if (language) {
          let prefix = language.value.substring(0, 2);
          this.setLanguage(prefix);
        }
      })
      .catch(e => {
        this.setLanguage(AppConfig.CULTURES.english);
        console.error("Error setting default language: " + e);
      });
  }

  setLanguage(culture: string) {
    this.translate.setDefaultLang(culture);
    this.translate.use(culture);
  }
}
