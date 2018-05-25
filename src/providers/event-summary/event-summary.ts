import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { EventSummaryActionStatus, EventSummaryActionStep } from "../../model/event-sumary-actions";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class EventSummaryProvider {
  constructor(private http: HttpClient, private userStore: UserStore) {
  }

  getEventSummaryByClass(idClass:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.getEventSummary}?token=${this.userStore.user.Token}&idClass=${idClass}`).toPromise();
  }

  updateActionStep(step : EventSummaryActionStep){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.putActionStep}?token=${this.userStore.user.Token}`, step).toPromise();
  }

  updateActionStatus(status : EventSummaryActionStatus){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.putActionStatus}?token=${this.userStore.user.Token}`, status).toPromise();
  }

  getClassById(idClass){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.event_summary.getClass}?token=${this.userStore.user.Token}&idClass=${idClass}`).toPromise();
  }
}
