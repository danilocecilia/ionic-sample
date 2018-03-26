import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotificationPage } from './modal-notification';
import { PipesModule } from "../../pipes/pipes.module";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ModalNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotificationPage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class ModalNotificationPageModule {}
