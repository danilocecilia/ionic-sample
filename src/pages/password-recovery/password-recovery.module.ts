import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordRecoveryPage } from './password-recovery';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    PasswordRecoveryPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordRecoveryPage),
    TranslateModule.forChild()
  ],
})
export class PasswordRecoveryPageModule {}
