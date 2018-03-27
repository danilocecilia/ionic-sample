import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DashboardComponent } from "../dashboard/dashboard";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Toast } from "@ionic-native/toast";
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
  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast
  ) {}

  openDashboard() {
    this.navCtrl.push(DashboardComponent);
  }

  openQRCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        // this.selectedProduct = this.products.find(
        //   product => product.plu === barcodeData.text
        // );
        // if (this.selectedProduct !== undefined) {
        //   this.productFound = true;
        // } else {
        //   this.productFound = false;
        //   this.toast
        //     .show(`Product not found`, "5000", "center")
        //     .subscribe(toast => {
        //       console.log(toast);
        //     });
        // }
      },
      err => {
        this.toast.show(err, "5000", "center").subscribe(toast => {
          console.log(toast);
        });
      }
    );

    //this.navCtrl.push(QrcodeComponent);
  }
}
