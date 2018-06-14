import { Component, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization";
import { PushOptions, PushObject } from "@ionic-native/push";
import * as AppConfig from "../app/config";

import { AuthProvider } from "../providers/auth/auth";
import { TabsPage } from "../pages/tabs/tabs";
import { AuthPage } from "../pages/auth/auth";
import { UserStore } from "../stores/user.store";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  showSplash = true;
  @ViewChild("content") nav: NavController;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private translate: TranslateService,
    private globalization: Globalization,
    private userStore: UserStore
  ) {
    platform.ready().then(() => {
      this.initializeAplication();
    });
  }

  initializeAplication() {
    this.statusBar.backgroundColorByHexString(AppConfig.COLORS.darkblue);

    this.splashScreen.hide();

    this.userStore.initialize().then(() => {
      this.authProvider.startupRefreshUserInfo();

      this.loadDefaultLanguage();

      this.redirectToPage();

      this.showSplash = false;
    });
  }

  redirectToPage() {
    if (this.userStore.user) {
      this.nav.setRoot(TabsPage);
    } else {
      this.nav.setRoot(AuthPage);
    }
  }

  loadDefaultLanguage() {
    let user = this.userStore.user;

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
