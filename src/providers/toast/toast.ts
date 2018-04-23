import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { FileOpener } from "@ionic-native/file-opener";

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

  presentToastWithCallBack(text: string, callback:Function, fileOpener:FileOpener, objCheckFile:any, fileMimeTypes:any) : Promise<any> {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom",
      showCloseButton: true, 
      closeButtonText: 'open'
    });

    toast.onDidDismiss(() => {
      callback(fileOpener, objCheckFile, fileMimeTypes);
    })

    return toast.present();
  }
}
