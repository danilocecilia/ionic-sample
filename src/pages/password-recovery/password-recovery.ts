import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';

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
    private formBuilder       : FormBuilder,
    private authProvider      : AuthProvider,
    private toastProvider     : ToastProvider,
    private translateProvider : TranslateProvider,
    private events            : Events) {

    this.authForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])]
    });
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
     this.passwordRecover();
    }
  }

  passwordRecover(){
    this.authProvider.recoverPassword(this.authForm.value.username)
    .then((response) => {
      if(response == "SUCCESS"){
        return "SuccessRecoverPassword";
      }
    })
    .catch(err => {
      return err.error;
    })
    .then(response => {
      this.translateProvider.translateMessage(response).then(translated => {
        this.toastProvider.presentToast(translated);
      });
    });
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
  }
}
