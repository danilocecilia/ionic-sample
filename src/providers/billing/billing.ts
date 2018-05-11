import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class BillingProvider {

  constructor(private http: HttpClient, private authProvider: AuthProvider) {}

  billingData: Subject<any> = new BehaviorSubject({})

  getBillsByClass(idClass: number){
    this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.getBills}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`)
    .subscribe(response => {
      this.billingData.next(response);
    })
  }

  changeBilling(billing:any){
    this.billingData.next(billing);
  }

  addBilling(billing:any){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.billing.add}?token=${this.authProvider.loggedUser.Token}`, billing).toPromise();
  }
}
