import { Component, ViewChild } from "@angular/core";
import { Platform, ModalController, NavController } from "ionic-angular";
// import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Events } from "ionic-angular";

import { AuthProvider } from "../providers/auth/auth";
import { TabsPage } from "../pages/tabs/tabs";
import { AuthPage } from "../pages/auth/auth";
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization";
// import * as APPConfig from "../app/config";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  currentUser: any;
  @ViewChild("content") nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    // private storage: Storage,
    public modalController: ModalController,
    public authProvider: AuthProvider,
    private translate: TranslateService,
    private globalization: Globalization
  ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#003a8b");
      splashScreen.hide();
      this.authProvider.startupTokenRefresh();

      translate.addLangs(["en", "pt"]);
    });

    this.getLocalStorageUser()
      .then(() => this.bindCulture(this.currentUser))
      .then(() => this.checkLoggedUser());
  }

  checkLoggedUser() {
    if (!this.currentUser) this.nav.setRoot(AuthPage);
    else {
      this.nav.setRoot(TabsPage);
    }
  }

  getLocalStorageUser() {
    return this.authProvider.getLoggedUser().then((res) => {
      
      this.currentUser = res;

      this.events.publish('currentUser', this.currentUser);
    });

    // return this.storage.get("currentUser").then(user => {
    //   if(user)
    //     this.currentUser = this.authProvider.loggedUser = user;
        
        
    //     //console.log('logged user: ' + JSON.stringify(this.authProvider.loggedUser));
    // });
  }

  bindCulture(user) {
    if (user) {
      if (user.Language && user.Language.Culture) {
        let culture = user.Language.Culture.substring(0, 2);

        this.setDefaultCulture(culture);
      } else {
        this.setDefaultCulture("en");
      }
    } else {
      this.globalization
        .getPreferredLanguage()
        .then(lang => {
          if (lang) {
            let c = lang.value.substring(0, 2);
            this.setDefaultCulture(c);
          }
        })
        .catch(e => {
          this.setDefaultCulture("en");
          console.error(e);
        });
    }
  }

  setDefaultCulture(culture: string) {
    this.translate.setDefaultLang(culture);
    this.translate.use(culture);
  }
}
