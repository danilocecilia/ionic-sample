import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
    TranslateModule.forChild()
  ],
})
export class AuthPageModule {}
