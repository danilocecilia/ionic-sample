import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurriculumPage } from './curriculum';
import { NgCalendarModule  } from 'ionic2-calendar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurriculumPage,
  ],
  imports: [
    IonicPageModule.forChild(CurriculumPage),
    NgCalendarModule,
    TranslateModule.forChild()
  ],
})
export class CurriculumPageModule {}
