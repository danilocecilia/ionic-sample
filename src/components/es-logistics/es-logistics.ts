import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ModalLogisticPage } from "../../pages/modal-logistic/modal-logistic";

/**
 * Generated class for the EsLogisticsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "es-logistics",
  templateUrl: "es-logistics.html"
})
export class EsLogisticsComponent {

  constructor(private navCtrl: NavController) {
    
  }

  onClickOpenModalLogistics() {
    this.navCtrl.push(ModalLogisticPage, {});
  }
}
