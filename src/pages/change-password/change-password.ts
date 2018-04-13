import { Component } from "@angular/core";
import { IonicPage, Events } from "ionic-angular";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";

@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  authForm: FormGroup;

  password: any = { value: "password" };
  newpassword: any = { value: "new password" };
  confirmpassword: any = { value: "repeat password" };
  minlength: any = { value: "6" };
  maxlength: any = { value: "30" };

  constructor(
    private formBuilder: FormBuilder,
    private events: Events,
    private authProvider: AuthProvider,
    private toastProvider: ToastProvider,
    private translateProvider: TranslateProvider
  ) {
    this.authForm = this.formBuilder.group({
      currentPassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      newPassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      repeatPassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidLoad() {
    this.events.publish("hideHeader", { isHidden: true });
    console.log("ionViewDidLoad ChangePasswordPage");
  }

  showHide(input){
    debugger;
    let control = this.authForm.get(input);
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.authProvider
        .changePassword(this.authForm.value)
        .then(() => {
          this.authForm.reset()
           return "SucessChangePassowrd"; 
          })
        .catch(err => {
          return err.error;
        })
        .then(message => {
          this.translateProvider.translateMessage(message).then(translated => {
            this.toastProvider.presentToast(translated);
          });
        });
    }
  }
}
