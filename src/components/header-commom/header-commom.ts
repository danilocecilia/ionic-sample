import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Toast } from "@ionic-native/toast";

import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { DashboardComponent } from "../dashboard/dashboard";
import { PrePostTestComponent } from "../pre-post-test/pre-post-test";
import { UserStore  } from "../../stores/user.store";

@Component({
  selector: "header-commom",
  templateUrl: "header-commom.html"
})
export class HeaderCommomComponent {
  isButtonsHidden: boolean = true;
  appName: string;

  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private authProvider: AuthProvider,
    private toast: Toast,
    private userStore: UserStore
  ) {
    this.appName = AppConfig.APP_NAME;

    this.userHasPermission();
  }

  userHasPermission() {
    let userPermissions = this.userStore.user.Permissions;

    if (userPermissions) {
      userPermissions.find(element => {
        if(element === AppConfig.APIPermission.GPS || element === AppConfig.APIPermission.DASHBOARD){
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
        if (!barcodeData.cancelled) {
          let values = barcodeData.text.split("|");
          this.navCtrl.push(PrePostTestComponent, {idTraining: values[0],idClass: values[1]});
        }
      },
      err => {
        this.toast.show(err, "5000", "center").subscribe(toast => {
          console.log(toast);
        });
      }
    );
  }
}
