import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events,
  Platform
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { PasswordRecoveryPage } from "../password-recovery/password-recovery";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";
import { LoadingProvider } from "../../providers/loading/loading";
import { Response } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { TranslateProvider } from "../../providers/translate/translate";
import { ToastProvider } from "../../providers/toast/toast";

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
  userProfile = {};
  toastMessage: string;
  loggedUser: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private authProvider: AuthProvider,
    private menu: MenuController,
    private events: Events,
    private loadingProvider: LoadingProvider,
    private translate: TranslateService,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private platform: Platform
  ) {
    this.menu.enable(false);

    this.navCtrl = navCtrl;

    this.toastMessage = navParams.get("message");

    this.authForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["",Validators.compose([Validators.required, Validators.minLength(3)])],
      devideToken: "uiashdfiuahs79dfasdyf8asbdfugas0dfajs8",
      device: this.platform.is('ios') ? 'ios' : 'android'
    });

    this.events.publish("hideHeader", { isHidden: true });
  }

  redirectToHome() {
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.loadingProvider.presentLoadingDefault();
      this.authProvider
        .getAuthenticate(this.authForm.value)
        .then(response => {
          if (response !== undefined) {
            console.log("RESPOSNE: " + response);
            return this.loadingProvider.dismissLoading().then(res => {
              if (this.authProvider.loggedUser) {
                this.loggedUser = this.authProvider.loggedUser;
                this.events.publish("currentUser", this.loggedUser);
              }

              this.setCurrentCulture();
              this.redirectToHome();
            });
          }
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
    if (this.toastMessage) {
      this.translateProvider
        .translateMessage(this.toastMessage)
        .then(translated => {
          if (translated) this.toastProvider.presentToast(translated);
          else console.log("translated not found: " + translated);
        });
    }
    this.events.publish("hideHeader", { isHidden: true });
  }

  setCurrentCulture() {
    if (this.loggedUser.Language && this.loggedUser.Language.Culture) {
      let culture = this.loggedUser.Language.Culture.substring(0, 2);

      this.translate.setDefaultLang(culture);
      this.translate.use(culture);
    }
  }

  goToPasswordRecovery() {
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
