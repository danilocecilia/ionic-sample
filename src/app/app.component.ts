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
  @ViewChild("content") nav: NavController;

  private currentLanguage: string;

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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.authProvider.startupTokenRefresh();

      translate.addLangs(["en", "pt"]);
      translate.setDefaultLang("pt");

      //let browserLang = translate.getBrowserLang();

      // console.log(this.currentLanguage);
      // this.storage.get("currentLanguage").then(lang => {
      //   this.currentLanguage = lang;
      //   translate.use(this.currentLanguage);
      // });

      this.storage.get("token").then(token => {
        if (!token) this.nav.setRoot(AuthPage);
        else this.nav.setRoot(TabsPage);
      });
    });
  }
}
