import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';
import { GradeHistory } from "../../model/enrollments";
import { History } from "../../model/enrollments";
@Injectable()
export class EnrollmentProvider {
  constructor(private http: HttpClient, private authProvider : AuthProvider) {
  }

  loadEnrollmentsByClass(idClass:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.enrollmentsByClass}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }

  removeEnrollment(enrollment: GradeHistory){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.removeEnrollment}?token=${this.authProvider.loggedUser.Token}`, enrollment).toPromise();
  }
  
  updateGrades(gradeHistory : GradeHistory){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.updateGrade}?token=${this.authProvider.loggedUser.Token}`, gradeHistory).toPromise();
  }

  enrollUser(history: History){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.enrollUser}?token=${this.authProvider.loggedUser.Token}`, history).toPromise();
  }

  enrollForWebBasedTraining(obj: History){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.addForWebBased}?token=${this.authProvider.loggedUser.Token}`, obj).toPromise();
  }
}
