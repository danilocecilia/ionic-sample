import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';
import { EventSummaryActionStatus, EventSummaryActionStep } from "../../model/event-sumary-actions";
@Injectable()
export class EventSummaryProvider {
  constructor(private http: HttpClient, private authProvider : AuthProvider) {
  }

  getEventSummaryByClass(idClass:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.getEventSummary}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }

  updateActionStep(step : EventSummaryActionStep){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.putActionStep}?token=${this.authProvider.loggedUser.Token}`, step).toPromise();
  }

  updateActionStatus(status : EventSummaryActionStatus){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.putActionStatus}?token=${this.authProvider.loggedUser.Token}`, status).toPromise();
  }

  getClassById(idClass){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.getClass}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }
}
