import { Component, ViewChild } from "@angular/core";
import { Platform, ModalController, NavController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Events } from "ionic-angular";

import { AuthProvider } from "../providers/auth/auth";
import { TabsPage } from "../pages/tabs/tabs";
import { AuthPage } from "../pages/auth/auth";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  currentUser: any;
  @ViewChild("content") nav: NavController;
  cultures: any = ["pt", "en", "es"];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    private storage: Storage,
    public modalController: ModalController,
    public authProvider: AuthProvider,
    private translate: TranslateService
  ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#003a8b");
      splashScreen.hide();
      this.authProvider.startupTokenRefresh();

      translate.addLangs(["en", "pt"]);
    });

    this.getLocalStorageUser();
  }

  checkLoggedUser() {
    if (!this.currentUser) this.nav.setRoot(AuthPage);
    else {
      this.nav.setRoot(TabsPage);
    }
  }

  getLocalStorageUser() {
    this.storage
      .get("currentUser")
      .then(user => {
        this.currentUser = user;
      })
      .then(() => this.setCurrentCulture(this.currentUser))
      .then(() => this.checkLoggedUser());
  }

  setCurrentCulture(user) {
    if (user) {
      if (user.Language && user.Language.Culture) {
        let culture = user.Language.Culture.substring(0, 2);

        for (let c of this.cultures) {
          if (culture === c) {
            this.translate.setDefaultLang(culture); // Set language
          }
        }
      } else {
        this.translate.setDefaultLang("en"); //Set default culture
      }
    }
  }
}
