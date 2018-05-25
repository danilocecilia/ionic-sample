import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { BehaviorSubject, Subject } from "rxjs";
import { UserStore } from "../../stores/user.store";

@Injectable()
export class BillingProvider {
  constructor(private http: HttpClient, private userStore: UserStore) {}

  getBillsByClass(idClass: number) {
    return this.http
      .get(
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.getBills}?token=${
          this.userStore.user.Token
        }&idClass=${idClass}`
      )
      .toPromise();
  }

  addBilling(billing: any) {
    return this.http
      .post(
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.add}?token=${
          this.userStore.user.Token
        }`,
        billing
      )
      .toPromise();
  }
}
