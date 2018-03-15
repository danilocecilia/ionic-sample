import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html',
})
export class PasswordRecoveryPage {
  username: any = { value: "username" };
  minlength: any = { value: "8" };
  maxlength: any = { value: "30" };
  authForm: FormGroup;

  constructor(
    public navCtrl      : NavController,
    public navParams    : NavParams,
    public formBuilder  : FormBuilder,
    private translate   : TranslateService,
    public events       : Events) {

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
  }
}
