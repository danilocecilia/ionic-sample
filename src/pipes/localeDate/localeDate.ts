import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "localeDate"
})
export class LocaleDatePipe implements PipeTransform {
  transform(date, culture: string) {
    if (culture) {
      switch (culture) {
        case "pt-BR":
          moment.locale("pt");
          return moment(date).format("DD/MM/YYYY");
        case "es-ES":
          moment.locale("es");
          return moment(date).format("DD/MM/YYYY");
        default:
          moment.locale("en");
          return moment(date).format("MM/DD/YYYY");
      }
    }
  }
}
