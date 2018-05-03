import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';
import { GradeHistory } from "../../model/enrollments";

@Injectable()
export class EnrollmentProvider {
  constructor(public http: HttpClient, private authProvider : AuthProvider) {
  }

  loadEnrollmentsByClass(idClass:number){
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.history.enrollmentsByClass}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }

  removeEnrollment(enrollment: GradeHistory){
    return this.http.post(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.history.removeEnrollment}?token=${this.authProvider.loggedUser.Token}`, enrollment).toPromise();
  }
  
  updateGrades(gradeHistory : GradeHistory){
    return this.http.post(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.history.updateGrade}?token=${this.authProvider.loggedUser.Token}`, gradeHistory).toPromise();
  }
}
