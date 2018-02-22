import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EsEnrollmentsComponent } from '../es-enrollments/es-enrollments';
import { AccordionListComponent  } from "../accordion-list/accordion-list";
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

  constructor(private navCtrl: NavController) {

  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, {});
  }

}
