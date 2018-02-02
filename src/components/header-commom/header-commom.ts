import { Component } from '@angular/core';

/**
 * Generated class for the HeaderCommomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-commom',
  templateUrl: 'header-commom.html'
})
export class HeaderCommomComponent {

  text: string;

  constructor() {
    console.log('Hello HeaderCommomComponent Component');
    this.text = 'Hello World';
  }

}
