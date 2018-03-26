import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localeDate',
})
export class LocaleDatePipe implements PipeTransform {

  transform(date, format: any, locale?: string) {
    moment.locale(locale);
    return moment(date).format(format);
  }
}
