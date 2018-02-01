import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the PasswordRecoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html',
})
export class PasswordRecoveryPage {
  // @ViewChild('myNav') nav: NavController
  authForm: FormGroup;

  constructor(
    public navCtrl      : NavController,
    public navParams    : NavParams,
    public formBuilder  : FormBuilder,
    public events: Events) {

    this.authForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])]
    });
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      console.log("Ok");
    }
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
    console.log('ionViewDidLoad PasswordRecoveryPage');
  }
}
