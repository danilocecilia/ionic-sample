import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as APPConfig from '../../app/config'
import { UserStore } from "../../stores/user.store";
@Injectable()
export class AgendaProvider {
  
  constructor(public http: HttpClient, private userStore: UserStore) {
  }

  getEventsByDates(start, end){
      return this.http.get(`${APPConfig.cfg.apiUrl + APPConfig.cfg.agenda.getClassesByDate}?token=${this.userStore.user.Token}&start=${start}&end=${end}`).toPromise();
  }

  getEvents(trainingId){
    return this.http.get(`${APPConfig.cfg.apiUrl + APPConfig.cfg.agenda.getClassesByTraining}?token=${this.userStore.user.Token}&training=${trainingId}`);
  }

}
