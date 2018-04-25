import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as APPConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';

@Injectable()
export class EventSummaryProvider {
  constructor(public http: HttpClient, private authProvider : AuthProvider) {
  }

  getEventSummary(idClass:number){
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.event_summary.getEventSummary}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }
}
