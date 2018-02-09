import { Component } from '@angular/core';

/**
 * Generated class for the EnrollmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'enrollment',
  templateUrl: 'enrollment.html'
})
export class EnrollmentComponent {

  text: string;

  constructor() {
    console.log('Hello EnrollmentComponent Component');
    this.text = 'Hello World';
  }

}
