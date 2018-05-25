import { Component, OnInit } from "@angular/core";
import { BillingProvider } from "../../providers/billing/billing";
import * as AppConfig from "../../app/config";
import { NavParams } from "ionic-angular";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";
import { UserStore } from "../../stores/user.store";
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
    private navParam: NavParams,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider,
    private userStore: UserStore

  ) {
    this.currentCulture = userStore.user.Language.Culture;

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
