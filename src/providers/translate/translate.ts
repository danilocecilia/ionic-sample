import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class TranslateProvider {
  constructor(private translate: TranslateService) {}

  translateMessage(message) {
    return this.translate.get(message).toPromise();
  }
}
