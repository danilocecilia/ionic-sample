import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { Logistic, LogisticItemXClass } from '../../model/logistic';
import { LogisticStore } from '../../stores/logistic.store';
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class LogisticProvider {

  constructor(private http: HttpClient, private userStore: UserStore, private logisticStore: LogisticStore) {
  }

  getLogisticTypes(){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getTypes}?token=${this.userStore.user.Token}`).toPromise();
  }

  getLogisticsByClass(idClass): Promise<Logistic>{
    return this.http.get<Logistic>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.logistics}?token=${this.userStore.user.Token}&ID_Class=${idClass}`).toPromise()
    .then(response => {
      return this.logisticStore.logistic = response;
    });
  }

  getLogisticItems(type){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getItemsByType}?token=${this.userStore.user.Token}&type=${type}`).toPromise();
  }

  removeLogistic(idLogisticItem:number){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.remove}?token=${this.userStore.user.Token}`, idLogisticItem).toPromise()
    .then((response: Logistic) => {
      this.logisticStore.deleteLogistic(idLogisticItem);
    });
  }
  
  getFilesByLogistic(idLogistic){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.getFiles}?token=${this.userStore.user.Token}&ID_LogisticItemXClass=${idLogistic}`).toPromise();
  }

  removeFile(idFile, idLogistic){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.removeFile}?ID_LogisticItemXClass=${idLogistic}&token=${this.userStore.user.Token}`, idFile).toPromise();
  }

  updateLogistic(obj:LogisticItemXClass) {
    return this.http.post<LogisticItemXClass>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.update}?token=${this.userStore.user.Token}`, obj).toPromise()
    .then(response => {
      this.logisticStore.updateLogistic(response);
    });
  }

  addLogistic(obj: LogisticItemXClass){
    return this.http.post<LogisticItemXClass>(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.add}?token=${this.userStore.user.Token}`, obj).toPromise()
    .then(response => {
       obj.ID = response.ID;
       this.logisticStore.addLogistic(response);
    })
  }
}
