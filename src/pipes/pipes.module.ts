import { NgModule } from '@angular/core';
import { LocaleDatePipe } from './localeDate/localeDate';
import * as moment from 'moment';
import { LocaleFormatPipe } from './locale-format/locale-format';
@NgModule({
	declarations: [LocaleDatePipe, LocaleFormatPipe],
	imports: [],
	exports: [LocaleDatePipe, LocaleFormatPipe]
})
export class PipesModule {}
