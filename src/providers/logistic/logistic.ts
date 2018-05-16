import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { AuthProvider  } from "../../providers/auth/auth";
import { Logistic } from '../../model/logistic';
import { LogisticStore } from '../../stores/logistic.store';
@Injectable()
export class LogisticProvider {

  constructor(private http: HttpClient, private authProvider: AuthProvider, private logisticStore: LogisticStore) {
  }

  getLogisticTypes(){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getTypes}?token=${this.authProvider.loggedUser.Token}`).toPromise();
  }

  getLogisticsByClass(idClass): Promise<Logistic>{
    return this.http.get<Logistic>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.logistics}?token=${this.authProvider.loggedUser.Token}&ID_Class=${idClass}`).toPromise()
    .then(response => {
      return this.logisticStore.logistic = response;
    });
  }

  getLogisticItems(type){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getItemsByType}?token=${this.authProvider.loggedUser.Token}&type=${type}`).toPromise();
  }

  removeLogistic(idLogisticItem:number){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.remove}?token=${this.authProvider.loggedUser.Token}`, idLogisticItem).toPromise()
    .then((response: Logistic) => {
      this.logisticStore.deleteLogistic(idLogisticItem);
    });
  }
  
  getFilesByLogistic(idLogistic){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getFiles}?token=${this.authProvider.loggedUser.Token}&ID_LogisticItemXClass=${idLogistic}`).toPromise();
  }

  removeFile(idFile, idLogistic){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.removeFile}?ID_LogisticItemXClass=${idLogistic}&token=${this.authProvider.loggedUser.Token}`, idFile).toPromise();
  }

  updateLogistic(obj:Logistic) {
    return this.http.post<Logistic>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.update}?token=${this.authProvider.loggedUser.Token}`, obj).toPromise()
    .then(response => {
      this.logisticStore.updateLogistic(response);
    });
  }

  addLogistic(obj: Logistic){
    return this.http.post<Logistic>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.add}?token=${this.authProvider.loggedUser.Token}`, obj).toPromise()
    .then(response => {
      obj.ID = response.ID;
      this.logisticStore.addLogistic(response);
    })
  }
}
