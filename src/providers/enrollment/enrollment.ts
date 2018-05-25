import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { GradeHistory } from "../../model/enrollments";
import { History } from "../../model/enrollments";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class EnrollmentProvider {
  constructor(private http: HttpClient, private userStore: UserStore) {
  }

  loadEnrollmentsByClass(idClass:number){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.enrollmentsByClass}?token=${this.userStore.user.Token}&idClass=${idClass}`).toPromise();
  }

  removeEnrollment(enrollment: GradeHistory){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.removeEnrollment}?token=${this.userStore.user.Token}`, enrollment).toPromise();
  }
  
  updateGrades(gradeHistory : GradeHistory){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.updateGrade}?token=${this.userStore.user.Token}`, gradeHistory).toPromise();
  }

  enrollUser(history: History){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.enrollUser}?token=${this.userStore.user.Token}`, history).toPromise();
  }

  enrollForWebBasedTraining(obj: History){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.history.addForWebBased}?token=${this.userStore.user.Token}`, obj).toPromise();
  }
}
