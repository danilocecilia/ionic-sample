import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";

@Pipe({
  name: 'localeFormat',
})
export class LocaleFormatPipe implements PipeTransform {
  transform(culture: string) {
    switch (culture) {
      case "pt-BR":
        return "DD/MM/YYYY";
      case "es-ES":
        moment.locale("es");
        return "DD/MM/YYYY";
      default:
        moment.locale("en");
        return "MM/DD/YYYY";
    }
  }
}
