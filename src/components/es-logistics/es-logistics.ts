import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ModalLogisticPage } from "../../pages/modal-logistic/modal-logistic";

@Component({
  selector: "es-logistics",
  templateUrl: "es-logistics.html"
})
export class EsLogisticsComponent {
  event:any;

  constructor(private navCtrl: NavController, private navParam : NavParams) {
    this.event = this.navParam.get('event');
  }

  onClickOpenModalLogistics() {
    this.navCtrl.push(ModalLogisticPage, {});
  }
}
