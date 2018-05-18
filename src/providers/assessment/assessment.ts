import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";
import { AssessmentStore } from "../../stores/assessment.store";
import { Assessment } from "../../model/assessment";
import { ResolvedAssessment } from "../../model/resolved-assessment";

@Injectable()
export class AssessmentProvider {
  constructor(
    private http: HttpClient,
    private authProvider: AuthProvider,
    private assessmentStore: AssessmentStore
  ) {}

  getAssessment(idTraining: number) {
    return this.http
      .get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.assessment.get}?token=${this.authProvider.loggedUser.Token}&idTraining=${idTraining}`).toPromise()
      .then((response: Assessment) => {
        this.assessmentStore.getAssessment(response);
      });
  }

  addResolvedAssessment(obj: ResolvedAssessment){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.assessment.add}?token=${this.authProvider.loggedUser.Token}`, obj).toPromise();
  }
}
