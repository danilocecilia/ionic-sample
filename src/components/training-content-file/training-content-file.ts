import { Component } from '@angular/core';

/**
 * Generated class for the TrainingContentFileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'training-content-file',
  templateUrl: 'training-content-file.html'
})
export class TrainingContentFileComponent {

  text: string;

  constructor() {
    console.log('Hello TrainingContentFileComponent Component');
    this.text = 'Hello World';
  }

}
