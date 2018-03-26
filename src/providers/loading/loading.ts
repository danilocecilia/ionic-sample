import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LoadingProvider {
  loading: any;
  constructor(
    public loadingController: LoadingController,
    private translate: TranslateService
  ) { }

  translateMessage() {
    return this.translate.get("LoadingMessage").toPromise();
  }

  presentLoadingDefault() {
    this.translateMessage().then(message => {
      this.loading = this.loadingController.create({
        content: message
      });

      this.loading.present();

      setTimeout(() => {
        this.loading.dismiss();
      }, 10000);
    });
  }

  presentLoadingCustom() {
    let loading = this.loadingController.create({
      spinner: "hide",
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log("Dismissed loading");
    });

    loading.present();
  }

  dismissLoading() {
    return this.loading.dismiss();
  }
}
