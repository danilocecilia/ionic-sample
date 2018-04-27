import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { AuthProvider } from '../auth/auth';

@Injectable()
export class EnrollmentProvider {
  constructor(public http: HttpClient, private authProvider : AuthProvider) {
  }

  // loadEnrollments() {
  //   return this.http.get(`${this.baseUrl}/enrollments/`);
  // }

  loadEnrollmentsByClass(idClass:number){
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.event_summary.enrollmentsByClass}?token=${this.authProvider.loggedUser.Token}&idClass=${idClass}`).toPromise();
  }
}
