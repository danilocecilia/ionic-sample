import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
@Injectable()
export class TrainingStepsProvider {

  constructor(private http: HttpClient, private authProvider: AuthProvider) {
  }

  loadSteps(idTraining:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.trainingSteps.load}?token=${this.authProvider.loggedUser.Token}&idTraining=${idTraining}`).toPromise();
  }

}
