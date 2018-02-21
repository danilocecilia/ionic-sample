import { Component } from '@angular/core';

/**
 * Generated class for the AssessmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentComponent {

  text: string;

  constructor() {
    console.log('Hello AssessmentComponent Component');
    this.text = 'Hello World';
  }

}
