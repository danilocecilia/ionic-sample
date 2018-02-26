import { Component } from '@angular/core';

/**
 * Generated class for the EsBillingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'es-billings',
  templateUrl: 'es-billings.html'
})
export class EsBillingsComponent {

  text: string;

  constructor() {
    console.log('Hello EsBillingsComponent Component');
    this.text = 'Hello World';
  }

  onClickUpdate(){
    console.log('teste');
  }

}
