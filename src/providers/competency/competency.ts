import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AppConfig from "../../app/config";
import { CompetencyStore  } from "../../stores/competency.store";
import { Competency } from "../../model/competency";
import { UserStore } from "../../stores/user.store";

@Injectable()
export class CompetencyProvider {
  constructor(
    public http: HttpClient, 
    private userStore: UserStore,
    private competencyStore: CompetencyStore) {}

  getCompetency(idCompetency: number) {
    return this.http.get(`${AppConfig.cfg.apiUrl + AppConfig.cfg.curriculum.getByJobRole}?token=${this.userStore.user.Token}&id=${idCompetency}`).toPromise()
    .then((response: Competency) => {
      return this.competencyStore.getCompetency(response);
    });
  }
}
