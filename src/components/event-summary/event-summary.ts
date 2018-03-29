import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EsEnrollmentsComponent } from "../es-enrollments/es-enrollments";
import { AccordionListComponent } from "../accordion-list/accordion-list";
import { EsGradesComponent } from "../es-grades/es-grades";
import { EsBillingsComponent } from "../es-billings/es-billings";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { EsLogisticsComponent } from "../es-logistics/es-logistics";

@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent {
  event: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.event = this.navParams.get("event");
  }

  onClickGrades() {
    this.navCtrl.push(EsGradesComponent, { event: this.event });
  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, { event: this.event });
  }

  onClickLogistics() {
    this.navCtrl.push(EsLogisticsComponent, { event: this.event });
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, { event: this.event });
  }
}
