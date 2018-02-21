import { Component } from '@angular/core';

/**
 * Generated class for the EventSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-summary',
  templateUrl: 'event-summary.html'
})
export class EventSummaryComponent {

  text: string;

  constructor() {
    console.log('Hello EventSummaryComponent Component');
    this.text = 'Hello World';
  }

}
