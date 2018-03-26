import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events
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
import * as APPConfig from "../../app/config";

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
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authProvider: AuthProvider,
    public menu: MenuController,
    public events: Events,
    // private toastCtrl: ToastController,
    private loadingProvider: LoadingProvider,
    private translate: TranslateService,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider
  ) {
    this.menu.enable(false);

    this.navCtrl = navCtrl;

    this.toastMessage = navParams.get("message");

    this.authForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      devideToken: "uiashdfiuahs79dfasdyf8asbdfugas0dfajs8",
      device: "android"
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
        .then(() => {
          return this.loadingProvider.dismissLoading().then(res => {
            if (this.authProvider.loggedUser) {
              this.loggedUser = this.authProvider.loggedUser;
            }

            this.setCurrentCulture();
            this.redirectToHome();
          });
        })
        .catch((err: Response) => {
          return this.loadingProvider.dismissLoading().then(() => {
            console.error(err);
            let errMsg = err.json();

            this.translateProvider.translateMessage(errMsg).then(value => {
              if (value) {
                this.toastProvider.presentToast(value);
                console.log("translation found: " + value);
              } else console.log("not found: " + value);
            });
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
    this.events.publish("currentUser", { currentUser: this.loggedUser });
    
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
