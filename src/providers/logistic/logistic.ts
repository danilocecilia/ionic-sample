import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { AuthProvider  } from "../../providers/auth/auth";
@Injectable()
export class LogisticProvider {

  constructor(private http: HttpClient, private authProvider: AuthProvider) {

  }

  getLogisticTypes(){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getTypes}?token=${this.authProvider.loggedUser.Token}`).toPromise();
  }

  getLogisticsByClass(idClass){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.logistics}?token=${this.authProvider.loggedUser.Token}&ID_Class=${idClass}`).toPromise();
  }

  getLogisticItems(type){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getItemsByType}?token=${this.authProvider.loggedUser.Token}&type=${type}`).toPromise();
  }

}
