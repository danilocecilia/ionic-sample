import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "page-modal-logistic",
  templateUrl: "modal-logistic.html"
})
export class ModalLogisticPage {
  fileURI: any;
  imageFileName: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private transfer: FileTransfer,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser,
    private loadingProvider: LoadingProvider
  ) {}

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
