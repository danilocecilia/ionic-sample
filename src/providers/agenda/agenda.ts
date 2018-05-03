import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as APPConfig from '../../app/config'
import { AuthProvider } from "../auth/auth";

@Injectable()
export class AgendaProvider {
  
  constructor(public http: HttpClient, private authProvider: AuthProvider) {
  }

  getEventsByDates(start, end){
      return this.http.get(`${APPConfig.cfg.apiUrl + APPConfig.cfg.agenda.getClassesByDate}?token=${this.authProvider.loggedUser.Token}&start=${start}&end=${end}`).toPromise();
  }

  getEvents(trainingId){
    return this.http.get(`${APPConfig.cfg.apiUrl + APPConfig.cfg.agenda.getClassesByTraining}?token=${this.authProvider.loggedUser.Token}&training=${trainingId}`);
  }

}
