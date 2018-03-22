import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class CompetencyProvider {
  constructor(
    public http: HttpClient, 
    private auth: AuthProvider) {}

  getCompetency(idCompetency: number) {
    return this.auth.getToken()
    .then(token => {
      return this.http.get(`${AppConfig.cfg.apiUrl + AppConfig.cfg.curriculum.getByJobRole}?token=${token}&id=${idCompetency}`).toPromise();
    });
  }
}
