import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the CompetencyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompetencyProvider {
  private baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = 'https://5a79a9137fbfbb0012625721.mockapi.io/api/';
  }

  getCompetency(idCompetency: number) {
    return this.http.get(`${this.baseUrl}/competency/${idCompetency}`);
  }
}
