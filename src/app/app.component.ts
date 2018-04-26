import { Component, ViewChild } from "@angular/core";
import { Platform, NavController, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Events } from "ionic-angular";
import { AuthProvider } from "../providers/auth/auth";
import { TabsPage } from "../pages/tabs/tabs";
import { AuthPage } from "../pages/auth/auth";
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization";
import { timer  } from "rxjs/observable/timer";
import { PushOptions, PushObject, Push } from "@ionic-native/push";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  currentUser: any;
  @ViewChild("content") nav: NavController;
  showSplash = true;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private events: Events,
    private authProvider: AuthProvider,
    private translate: TranslateService,
    private globalization: Globalization,
    private push: Push,
    private alertCtrl: AlertController
    
  ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#003a8b");
      splashScreen.hide();
      
      this.pushsetup();

      translate.addLangs(["en", "pt"]);

      this.getLocalStorageUser()
        .then(() => this.bindCulture())
        .then(() => this.checkIfUserIsLogged())
        .then(() => this.authProvider.startupTokenRefresh())
    });

    timer(3000).subscribe(() => this.showSplash = false);
  }

  pushsetup() {
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

  checkIfUserIsLogged() {
    if (!this.currentUser) this.nav.setRoot(AuthPage);
    else {
      this.nav.setRoot(TabsPage);
    }
  }

  getLocalStorageUser() {
    return this.authProvider.getLoggedUser().then(res => {
      this.currentUser = res;

      this.events.publish("currentUser", this.currentUser);
    });
  }

  bindCulture() {
    let user = this.currentUser;

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
