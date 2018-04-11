import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DashboardComponent } from "../dashboard/dashboard";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Toast } from "@ionic-native/toast";
import { AuthProvider } from "../../providers/auth/auth";
import * as APPConfig from "../../app/config";

@Component({
  selector: "header-commom",
  templateUrl: "header-commom.html"
})
export class HeaderCommomComponent {
  isButtonsHidden: boolean = true;
  
  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private authProvider: AuthProvider,
    private toast: Toast
  ) {
    this.userHasPermission();
  }

  userHasPermission() {
    let user = this.authProvider.loggedUser;

    if (user.Permissions) {
      user.Permissions.find(element => {
        let permission = APPConfig.APIPermission[element];

        if (permission === "GPS" || permission === "DASHBOARD") {
          this.isButtonsHidden = false;
        }
      });
    }
  }

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
