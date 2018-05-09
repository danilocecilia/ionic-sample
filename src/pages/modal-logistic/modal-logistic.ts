import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { LoadingProvider } from "../../providers/loading/loading";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastProvider } from "../../providers/toast/toast";
import * as AppConfig from "../../app/config";
import { DownloadProvider } from "../../providers/download/download";
import { TranslateProvider } from "../../providers/translate/translate";
import { Logistic, LogisticItem } from "../../model/logistic";
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
  open: string;

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
    private toastProvider: ToastProvider,
    private fileChooser: FileChooser,
    private loadingProvider: LoadingProvider,
    private logisticProvider: LogisticProvider,
    private authProvider: AuthProvider,
    private downloadProvider: DownloadProvider,
    private translateProvider: TranslateProvider
  ) {
    this.getTranslatedOpenButton();
    this.logistic = this.navParam.get("logistic");
    this.classAPI = this.navParam.get("class");
    this.currentCulture = this.authProvider.loggedUser.Language.Culture;

    this.loadLogisticTypes();
    this.loadLogisticItems(this.logistic.Type.ID);
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  getDocument() {
    this.fileChooser
      .open()
      .then(uri => {
        this.fileURI = uri;
      })
      .catch(err => {
        console.log(err);
        this.toastProvider.presentTranslatedToast("ErrorMessage");
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

  removeFile(idFile) {
    this.loadingProvider.presentLoadingDefault();

    this.logisticProvider
      .removeFile(idFile, this.logistic.ID)
      .then(files => {
        this.loadingProvider.dismissLoading();

        this.logistic.Files = files;
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
        this.toastProvider.presentTranslatedToast("ErrorMessage");
      });
  }

  calcTotalCost(){
    this.logistic.Cost = this.logistic.Qty * this.logistic.Item.UnitCost;
  }

  uploadFile() {
    this.loadingProvider.presentLoadingDefault();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "receiptLogistic",
      params: {
        ID_LogisticItemXClass: this.logistic.ID,
        token: this.authProvider.loggedUser.Token
      }
    };
    fileTransfer
      .upload(
        this.fileURI,
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.postFile}`,
        options
      )
      .then(
        obj => {
          this.loadingProvider.dismissLoading();
          if (obj) {
            this.logistic.Files = JSON.parse(obj.response);
            this.toastProvider.presentTranslatedToast("SuccessReceiptUpload");
            console.log(obj.response + " Uploaded Successfully");
          }
        },
        err => {
          this.loadingProvider.dismissLoading();
          console.log(err);
          this.toastProvider.presentTranslatedToast("ErrorMessage");
        }
      );
  }

  openFile(file) {
    let sourceFilePath = file.Path;
    let sourceFileName = file.FileName;
    let extension = file.Extension;

    this.loadingProvider.presentLoadingDefault();

    this.downloadProvider.initializeFileObject(
      sourceFilePath,
      sourceFileName,
      extension
    );

    let checkIfFileIsOnDevice = false;

    this.downloadProvider
      .openOrDownloadFile(checkIfFileIsOnDevice)
      .then(status => {
        this.loadingProvider.dismissLoading();

        if (status === "downloaded") {
          this.showSuccessToast(sourceFileName);
        }
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();

        this.translateProvider
          .translateMessage("ErrorMessage")
          .then(translated => {
            this.toastProvider.presentToast(translated);
          });

        console.log(err);
      });
  }

  showSuccessToast(sourceFileName) {
    this.translateProvider
      .translateMessageWithParam("SuccessDownloaded", sourceFileName)
      .then(translated => {
        this.toastProvider
          .presentToastWithCallBack(translated, this.open)
          .then(() => {
            this.downloadProvider.openDocument();
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  getTranslatedOpenButton() {
    this.translateProvider.translateMessage("Open").then(translated => {
      this.open = translated;
    });
  }

  updateLogistic() {
    let logistic = new Logistic(new LogisticItem);
    logistic.ID = this.logistic.ID;
    logistic.Cost = this.logistic.Cost;
    logistic.Date = this.logistic.Date;
    logistic.MonetarySymbol = this.logistic.MonetarySymbol;
    logistic.Qty = this.logistic.Qty;
    logistic.Description = this.logistic.Description;
    logistic.logisticItem.ID = this.logistic.Item.ID;

    this.logisticProvider.updateLogistic(logistic)
    .then(response => {
      if(response === "SUCCESS"){
        this.toastProvider.presentTranslatedToast("SuccessLogistic")
      }
    })
    .catch(err => {
      this.toastProvider.presentTranslatedToast("ErrorMessage")
      console.log(err);
    });
  }

  ionViewDidLoad() {
    //console.log("ionViewDidLoad ModalLogisticPage");
  }

  onCloseModal() {
    this.navCtrl.pop();
  }
}
