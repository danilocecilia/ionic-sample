import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, Events, Nav } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home'
import { PasswordRecoveryPage } from '../password-recovery/password-recovery';

import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  // public rootPage: any = HomePage;
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
    private toastCtrl: ToastController) {

    this.menu.enable(false);

    this.navCtrl = navCtrl;

    this.authForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.events.publish('hideHeader', { isHidden: true});
  }

  invalidCredentialsMsg() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Username or Password.',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  redirectToHome() {
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.authProvider.getAuthenticate(this.authForm.value)
        .then(() => this.redirectToHome());
    }
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true});
  }

  goToPasswordRecovery(){
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
