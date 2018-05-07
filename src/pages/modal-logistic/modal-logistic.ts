import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { LoadingProvider } from "../../providers/loading/loading";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { AuthProvider } from "../../providers/auth/auth";

export class MonetarySymbol {
  Currency: string;
  ID: number;
}

@Component({
  selector: "page-modal-logistic",
  templateUrl: "modal-logistic.html"
})
export class ModalLogisticPage {
  classAPI: any;
  logistic: any;
  fileURI: any;
  imageFileName: any;
  logisticTypes: any;
  logisticItems: any;
  currentCulture: string;

  monetarySymbol: MonetarySymbol[] = [
    { Currency: "NONE", ID: 1 },
    { Currency: "USD", ID: 2 },
    { Currency: "EUR", ID: 3 },
    { Currency: "BRL", ID: 4 },
    { Currency: "JPY", ID: 5 },
    { Currency: "TWD", ID: 6 }
  ];

  constructor(
    private navCtrl: NavController,
    private navParam: NavParams,
    private transfer: FileTransfer,
    private toastCtrl: ToastController,
    private fileChooser: FileChooser,
    private loadingProvider: LoadingProvider,
    private logisticProvider: LogisticProvider,
    private authProvider : AuthProvider
  ) {
    this.logistic = this.navParam.get("logistic");
    this.classAPI = this.navParam.get("class");
    debugger;
    this.currentCulture = this.authProvider.loggedUser.Language.Culture;
    this.loadLogisticTypes();
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  getFile() {
    this.fileChooser
      .open()
      .then(uri => {
        this.fileURI = uri;
      })
      .catch(err => {
        console.log(err);
        this.presentToast(err);
      });
  }

  loadLogisticTypes() {
    this.logisticProvider
      .getLogisticTypes()
      .then(types => {
        this.logisticTypes = types;
      })
      .catch(err => {
        console.log(err);
      });
  }

  ionChangeLogType(logType) {
    this.loadLogisticItems(logType);
  }

  loadLogisticItems(type) {
    this.logisticProvider
      .getLogisticItems(type)
      .then(response => {
        this.logisticItems = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   };

  //   this.camera.getPicture(options).then(
  //     imageData => {
  //       this.imageURI = imageData;
  //     },
  //     err => {
  //       console.log(err);
  //       this.presentToast(err);
  //     }
  //   );
  // }

  uploadFile() {
    this.loadingProvider.presentLoadingDefault();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "receiptLogistic",
      params: { classID: 1, token: "AUhaUhAuhAuAHUA" }
    };

    fileTransfer
      .upload(
        this.fileURI,
        "http://198.180.251.216:10005/fileupload/api/test/files",
        options
      )
      .then(
        data => {
          this.loadingProvider.dismissLoading();
          console.log(data + " Uploaded Successfully");
          //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
          // loader.dismiss();
          this.presentToast("Receipt uploaded successfully");
        },
        err => {
          this.loadingProvider.dismissLoading();
          console.log(err);
          // loader.dismiss();
          this.presentToast(
            "There was an error trying to upload your receipt, please contact the App Administrator."
          );
        }
      );
  }

  ionViewDidLoad() {
    //console.log("ionViewDidLoad ModalLogisticPage");
  }
  onCloseModal() {
    this.navCtrl.pop();
  }
}
