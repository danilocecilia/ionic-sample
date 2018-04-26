import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

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

  presentToastWithCallBack(text: string, open:string) : Promise<any> {
    const promise = new Promise((resolve, reject) => {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 5000,
        position: "bottom",
        showCloseButton: true, 
        closeButtonText: open
      });
  
      toast.onDidDismiss((data, role) => {
        if(role === "close"){
          resolve();
        }
        else{
          reject()
        }
      })

      toast.present();
    })
    return promise;
  }
}
