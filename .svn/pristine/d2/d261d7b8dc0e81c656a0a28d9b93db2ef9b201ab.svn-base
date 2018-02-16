import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendaProvider {
  private baseUrl: string;
  constructor(public http: HttpClient) {
    this.baseUrl = 'https://5a79a9137fbfbb0012625721.mockapi.io/api/'
  }

  loadAllEvents(start, end){
     return this.http.get(`${this.baseUrl}/agenda`);
  }

  getEvents(trainingId){
    return this.http.get(`${this.baseUrl}/agenda?search=New Dealer`);
  }

}
