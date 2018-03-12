import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  MenuController,
  Events,
  Nav,
  Toast
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import { PasswordRecoveryPage } from "../password-recovery/password-recovery";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";
import { LoadingProvider } from "../../providers/loading/loading";

@IonicPage()
@Component({
  selector: "page-auth",
  templateUrl: "auth.html"
})
export class AuthPage {
  authForm: FormGroup;
  userProfile = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authProvider: AuthProvider,
    public menu: MenuController,
    public events: Events,
    private toastCtrl: ToastController,
    private loadingProvider: LoadingProvider,
    
  ) {
    this.menu.enable(false);

    this.navCtrl = navCtrl;

    this.authForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z]*"),
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });

    this.events.publish("hideHeader", { isHidden: true });

    //if (localStorage.getItem("token") === null) this.navCtrl.setRoot(AuthPage);
  }

  // invalidCredentialsMsg() {
  //   let toast = this.toastCtrl.create({
  //     message: "Invalid Username or Password.",
  //     duration: 3000,
  //     position: "bottom"
  //   });

  //   toast.present();
  // }

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
          return this.loadingProvider.loading.dismiss().then(() => {
            this.redirectToHome();
          });
        })
        .catch(err => {
          return this.loadingProvider.loading.dismiss().then(() => {
            this.presentToast();
            console.log(err);
          });
        });
    }
  }

  presentToast(): Promise<any> {
    let toast = this.toastCtrl.create({
      message:
        "There were some error trying to login, please contact the Administrator",
      duration: 3000,
      position: "bottom",
      closeButtonText: "OK",
      showCloseButton: true
    });

    return toast.present();
  }

  ionViewDidLoad() {
    this.events.publish("hideHeader", { isHidden: true });
  }

  goToPasswordRecovery() {
    debugger;
    //this.loadingProvider.loading.dismiss();
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
