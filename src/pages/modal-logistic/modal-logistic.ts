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
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-modal-logistic",
  templateUrl: "modal-logistic.html"
})
export class ModalLogisticPage {
  imageURI: any;
  imageFileName: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private transfer: FileTransfer,
    private camera: Camera,
    public toastCtrl: ToastController
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

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURI = imageData;
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }

  uploadFile() {
    debugger;

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "ionicfile",
      fileName: "ionicfile",
      //chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {
        fileKey: "ionicfile",
        fileName: "ionicfile.jpg",
        mimeType: "image/jpeg"
      }
    };

    fileTransfer
      .upload(
        this.imageURI,
        "https://5a79a9137fbfbb0012625721.mockapi.io/api/file",
        options,
        true
      )
      .then(
        data => {
          console.log(data + " Uploaded Successfully");
          //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
          // loader.dismiss();
          this.presentToast("Image uploaded successfully");
        },
        err => {
          console.log(err);
          // loader.dismiss();
          this.presentToast(err);
        }
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalLogisticPage");
  }
  onCloseModal() {
    this.navCtrl.pop();
  }
}
