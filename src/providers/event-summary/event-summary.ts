import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as APPConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';
import { EventSummaryActionStatus, EventSummaryActionStep } from "../../model/event-sumary-actions";
@Injectable()
export class EventSummaryProvider {
  constructor(public http: HttpClient, private authProvider : AuthProvider) {
  }

  getEventSummaryByClass(idClass:number){
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.event_summary.getEventSummary}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }

  updateActionStep(step : EventSummaryActionStep){
    return this.http.post(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.event_summary.putActionStep}?token=${this.authProvider.loggedUser.Token}`, step).toPromise();
  }

  updateActionStatus(status : EventSummaryActionStatus){
    return this.http.post(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.event_summary.putActionStatus}?token=${this.authProvider.loggedUser.Token}`, status).toPromise();
  }
}
