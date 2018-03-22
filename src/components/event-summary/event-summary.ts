import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EsEnrollmentsComponent } from "../es-enrollments/es-enrollments";
import { AccordionListComponent } from "../accordion-list/accordion-list";
import { EsGradesComponent } from "../es-grades/es-grades";
import { EsBillingsComponent } from "../es-billings/es-billings";
/**
 * Generated class for the EventSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent {
  constructor(private navCtrl: NavController) {}

  onClickGrades() {
    this.navCtrl.push(EsGradesComponent, {});
  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, {});
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, {});
  }
}
