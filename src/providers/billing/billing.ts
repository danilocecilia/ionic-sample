import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class BillingProvider {
  constructor(private http: HttpClient, private authProvider: AuthProvider) {}

  getBillsByClass(idClass: number) {
    return this.http
      .get(
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.getBills}?token=${
          this.authProvider.loggedUser.Token
        }&idClass=${idClass}`
      )
      .toPromise();
  }

  addBilling(billing: any) {
    return this.http
      .post(
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.add}?token=${
          this.authProvider.loggedUser.Token
        }`,
        billing
      )
      .toPromise();
  }
}
