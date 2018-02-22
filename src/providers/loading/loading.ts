import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  loading:any;
  constructor(public http: HttpClient, public loadingController: LoadingController) {

  }

  presentLoadingDefault() {
    this.loading = this.loadingController.create({
      content: 'Please wait...'
    });

    this.loading.present();

    // setTimeout(() => {
    //   this.loading.dismiss();
    // }, 5000);
  }

  presentLoadingCustom() {
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
