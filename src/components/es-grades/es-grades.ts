import { Component, OnInit, Input } from "@angular/core";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the EsGradesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "es-grades",
  templateUrl: "es-grades.html"
})
export class EsGradesComponent {
  presence: boolean;
  testRadioOpen = false;
  testRadioResult: any;
  presenceType: string;
  hide: boolean = true;

  constructor(private alertCtrl: AlertController) {
    this.presence = true;
  }

  showWhenNotPresent(selectedValue: any) {
    this.hide = !this.hide;

    // if (!selectedValue) {
    //   let alert = this.alertCtrl.create();

    //   alert.setTitle("Justify fault");

    //   alert.addInput({
    //     type: "radio",
    //     label: "No Show",
    //     value: "noshow",
    //     checked: false
    //   });

    //   alert.addInput({
    //     type: "radio",
    //     label: "Justify",
    //     value: "Justify"
    //   });

    //   alert.addButton("Cancel");
    //   alert.addButton({
    //     text: "Ok",
    //     handler: (data: any) => {
    //       //console.log("Radio data:", data);
    //       this.hide = true;
    //       this.testRadioOpen = false;
    //       if (data === "noshow") this.presenceType = "No Show";
    //       else this.presenceType = "Justify";
    //     }
    //   });

    //   alert.present();
    // }
  }
}
