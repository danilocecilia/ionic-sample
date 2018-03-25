import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import * as moment from 'moment';
@NgModule({
	declarations: [MomentPipe],
	imports: [],
	exports: [MomentPipe]
})
export class PipesModule {}
