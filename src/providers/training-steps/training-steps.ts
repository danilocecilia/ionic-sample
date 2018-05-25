import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { UserStore } from "../../stores/user.store";

@Injectable()
export class TrainingStepsProvider {

  constructor(private http: HttpClient, private userStore: UserStore) {
  }

  loadSteps(idTraining:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.trainingSteps.load}?token=${this.userStore.user.Token}&idTraining=${idTraining}`).toPromise();
  }

}
