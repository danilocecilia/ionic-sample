import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { TranslateProvider } from "../../providers/translate/translate";

@Injectable()
export class ToastProvider {
  constructor(private toastCtrl: ToastController, private translateProvider: TranslateProvider) {
  }

  presentTranslatedToast(text: string) {
    this.translateProvider.translateMessage(text)
      .then(translated => {
        this.presentToast(translated);
      })
  }

  presentToast(text: string): Promise<any> {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom"
    });

    return toast.present();
  }

  presentToastWithCallBack(text: string, open: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 5000,
        position: "bottom",
        showCloseButton: true,
        closeButtonText: open
      });

      toast.onDidDismiss((data, role) => {
        if (role === "close") {
          resolve();
        }
        else {
          reject()
        }
      })

      toast.present();
    })
    return promise;
  }

  presentToastWithDismissCallback(text: string, open: string, callback: Function): void {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: "bottom",
      showCloseButton: true,
      closeButtonText: open
    });

    toast.onDidDismiss((data, role) => {
      if (role === "close") {
        callback(true)
      }
      else {
        callback(false)
      }
    })

    toast.present();
  }
}
