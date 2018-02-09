import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurriculumPage } from './curriculum';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    CurriculumPage,
  ],
  imports: [
    IonicPageModule.forChild(CurriculumPage),
    NgCalendarModule
  ],
})
export class CurriculumPageModule {}
