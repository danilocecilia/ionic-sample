import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events,
  Platform
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { TranslateProvider } from "../../providers/translate/translate";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";
import { TabsPage } from "../tabs/tabs";
import { PasswordRecoveryPage } from "../password-recovery/password-recovery";
import { UserStore } from "../../stores/user.store";


@IonicPage()
@Component({
  selector: "page-auth",
  templateUrl: "auth.html"
})
export class AuthPage {
  username: any = { value: "email" };
  password: any = { value: "password" };
  minlength: any = { value: "8" };
  maxlength: any = { value: "30" };

  authForm: FormGroup;
  appName: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private menu: MenuController,
    private events: Events,
    private loadingProvider: LoadingProvider,
    private translate: TranslateService,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private platform: Platform,
    private userStore: UserStore
  ) {
    this.menu.enable(false);

    this.appName = AppConfig.APP_NAME;

    this.navCtrl = navCtrl;

    this.initializeAuthForm();

    this.events.publish("hideHeader", { isHidden: true });
  }

  initializeAuthForm() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      devideToken: "",
      device: this.platform.is(AppConfig.DEVICE.ios)
        ? AppConfig.DEVICE.ios
        : AppConfig.DEVICE.android
    });
  }

  redirectToHome() {
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.loadingProvider.presentLoadingDefault();
      debugger;
      this.authProvider
        .authenticateUser(this.authForm.value)
        .then(response => {
          //this.setCurrentCulture();
          this.redirectToHome();
          this.loadingProvider.dismissLoading();
        })
        .catch(err => {
          this.translateProvider.translateMessage(err.error).then(value => {
            if (value) {
              this.toastProvider.presentToast(value);
              console.log("translation found: " + value);
            } else console.log("not found: " + value);
          });
        });
    }
  }

  ionViewDidLoad() {
    this.events.publish("hideHeader", { isHidden: true });
  }

  // setCurrentCulture() {
  //   if (this.userStore.user.Language && this.userStore.user.Language.Culture) {
  //     let culture = this.userStore.user.Language.Culture.substring(0, 2);

  //     this.translate.setDefaultLang(culture);
  //     this.translate.use(culture);
  //   }
  // }

  redirectToPasswordRecovery() {
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
