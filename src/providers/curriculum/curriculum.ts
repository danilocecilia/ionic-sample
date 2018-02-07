import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Competency } from '../../models/competency';
/*
  Generated class for the CurriculumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurriculumProvider {
  competencies: Observable<Competency[]>;
  private _competencies: BehaviorSubject<Competency[]>;
  private baseUrl: string;
  private dataStore: {
    competencies: Competency[]
  }

  constructor(public http: HttpClient) {
    this.baseUrl = 'https://5a79a9137fbfbb0012625721.mockapi.io/api/';
    this.dataStore = { competencies: [] };
  }

  loadCurriculum() {
    return this.http.get(`${this.baseUrl}/curriculum/`);
  }
}

