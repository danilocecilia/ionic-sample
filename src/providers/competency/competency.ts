import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Competency } from '../../models/competency';
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

  getCompetency(idJobRole: number): Observable<Competency>{
     return this.http.get(`${this.baseUrl}/competency/${idJobRole}`).map(res => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  loadAllCompetencies(): Observable<Competency[]> {
    return this.http.get(this.baseUrl + "competency")
      // ...now we return data
      .map(res => res)
      // ...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
