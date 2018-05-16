import { Component, OnInit } from "@angular/core";
import { BillingProvider } from "../../providers/billing/billing";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { NavParams } from "ionic-angular";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";
@Component({
  selector: "es-billings",
  templateUrl: "es-billings.html"
})
export class EsBillingsComponent implements OnInit {
  billings: any;
  baseUrl = AppConfig.cfg.baseUrl;
  currentCulture: string;
  currentClass: any;

  constructor(
    private billingProvider: BillingProvider,
    private authProvider: AuthProvider,
    private navParam: NavParams,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.currentCulture = this.authProvider.loggedUser.Language.Culture;

    this.currentClass = this.navParam.get("currentClass");
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();

    this.billingProvider
      .getBillsByClass(this.currentClass.ID)
      .then(billings => {
        this.loadingProvider.dismissLoading();
        this.billings = billings;
        console.log(this.billings);
      })
      .catch(err => {
        console.log(err);
        this.loadingProvider.dismissLoading();
      });
    // this.billingProvider.billingData.subscribe(response => {
    //   this.loadingProvider.dismissLoading();
    //   this.billings = response;
    //   console.log(this.billings);
    // });

    // this.billingProvider.getBillsByClass(this.currentClass.ID);
  }

  update(item) {
    this.loadingProvider.presentLoadingDefault();

    this.billingProvider
      .addBilling(item)
      .then(response => {
        if (response === "SUCCESS") {
          this.loadingProvider.dismissLoading();
          this.toastProvider.presentTranslatedToast("SuccessReceiptUpload");
        }
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        this.toastProvider.presentTranslatedToast("ErrorMessage");
        console.log(err);
      });
  }
}
