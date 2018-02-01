import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  authForm: FormGroup;
  
  constructor(
    public navCtrl    : NavController, 
    public navParams  : NavParams, 
    public formBuilder: FormBuilder,
    public events     : Events) {

      this.authForm = this.formBuilder.group({
        currentPassword:  ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        newPassword:      ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        repeatPassword:   ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true});
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      
    }
  }

}
