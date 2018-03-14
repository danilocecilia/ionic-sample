import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {
  constructor(private toastCtrl: ToastController) {
  }

  presentToast(text: string): Promise<any> {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom"
    });

    return toast.present();
  }
}
