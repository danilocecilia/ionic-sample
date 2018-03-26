import { NgModule } from '@angular/core';
import { LocaleDatePipe } from './localeDate/localeDate';
import * as moment from 'moment';
@NgModule({
	declarations: [LocaleDatePipe],
	imports: [],
	exports: [LocaleDatePipe]
})
export class PipesModule {}
