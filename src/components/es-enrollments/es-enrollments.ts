import { Component } from '@angular/core';

/**
 * Generated class for the EsEnrollmentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'es-enrollments',
  templateUrl: 'es-enrollments.html'
})
export class EsEnrollmentsComponent {

  text: string;

  constructor() {
    console.log('Hello EsEnrollmentsComponent Component');
    this.text = 'Hello World';
  }

}
