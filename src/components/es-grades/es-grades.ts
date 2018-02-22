import { Component } from '@angular/core';

/**
 * Generated class for the EsGradesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'es-grades',
  templateUrl: 'es-grades.html'
})
export class EsGradesComponent {

  text: string;

  constructor() {
    console.log('Hello EsGradesComponent Component');
    this.text = 'Hello World';
  }

}
