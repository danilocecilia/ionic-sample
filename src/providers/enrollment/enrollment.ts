import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the EnrollmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnrollmentProvider {
  private baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = "https://5a79a9137fbfbb0012625721.mockapi.io/api/";
    //this.dataStore = { competencies: [] };
  }

  loadEnrollments() {
    return this.http.get(`${this.baseUrl}/enrollments/`);
  }
}
