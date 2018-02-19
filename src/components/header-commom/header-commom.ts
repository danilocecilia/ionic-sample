import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DashboardComponent } from "../dashboard/dashboard";
/**
 * Generated class for the HeaderCommomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "header-commom",
  templateUrl: "header-commom.html"
})
export class HeaderCommomComponent {
  constructor(private navCtrl: NavController) {}

  openDashboard() {
    this.navCtrl.push(DashboardComponent);
  }
}
