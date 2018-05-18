import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";
import { CompetencyStore  } from "../../stores/competency.store";
import { Competency } from "../../model/competency";

@Injectable()
export class CompetencyProvider {
  constructor(
    public http: HttpClient, 
    private auth: AuthProvider,
    private competencyStore: CompetencyStore) {}

  getCompetency(idCompetency: number) {
    return this.http.get(`${AppConfig.cfg.apiUrl + AppConfig.cfg.curriculum.getByJobRole}?token=${this.auth.loggedUser.Token}&id=${idCompetency}`).toPromise()
    .then((response: Competency) => {
      return this.competencyStore.getCompetency(response);
    });
  }
}
