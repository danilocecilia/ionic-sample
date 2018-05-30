import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import * as AppConfig from "../../app/config";

import { LoadingProvider } from "../../providers/loading/loading";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { ToastProvider } from "../../providers/toast/toast";
import { DownloadProvider } from "../../providers/download/download";
import { TranslateProvider } from "../../providers/translate/translate";
import { Logistic, LogisticItem, LogisticType, LogisticItemXClass } from "../../model/logistic";
import { LogisticStore } from "../../stores/logistic.store";
import { Class } from "../../model/class";
import { UserStore } from "../../stores/user.store";
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
  logisticItemXClass: LogisticItemXClass = new LogisticItemXClass();
  logistic: Logistic = new Logistic();
  fileURI: any;
  imageFileName: any;
  logisticTypes: any;
  logisticItems: any;
  currentCulture: string;
  open: string;
  isNew: boolean;

  monetarySymbol: MonetarySymbol[] = [
    { Currency: "NONE", ID: 0 },
    { Currency: "USD", ID: 1 },
    { Currency: "EUR", ID: 2 },
    { Currency: "BRL", ID: 3 },
    { Currency: "JPY", ID: 4 },
    { Currency: "TWD", ID: 5 }
  ];

  constructor(
    private navCtrl: NavController,
    private navParam: NavParams,
    private transfer: FileTransfer,
    private toastProvider: ToastProvider,
    private fileChooser: FileChooser,
    private loadingProvider: LoadingProvider,
    private logisticProvider: LogisticProvider,
    private userStore: UserStore,
    private downloadProvider: DownloadProvider,
    private translateProvider: TranslateProvider,
    public logisticStore: LogisticStore
  ) {}

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
      .removeFile(idFile, this.logisticItemXClass.ID)
      .then((files: File[]) => {
        this.loadingProvider.dismissLoading();
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
        this.toastProvider.presentTranslatedToast("ErrorMessage");
      });
  }

  calculateTotalCost() {
    debugger;
    let lgItem = this.logisticItems.find(
      item => item.ID === this.logisticItemXClass.Item.ID
    );

    this.logisticItemXClass.Cost = this.logisticItemXClass.Qty * lgItem.UnitCost;
  }

  uploadFile() {
    this.loadingProvider.presentLoadingDefault();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "receiptLogistic",
      params: {
        ID_LogisticItemXClass: this.logisticItemXClass.ID,
        token: this.userStore.user.Token
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
            this.logisticItemXClass.Files = JSON.parse(obj.response);
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

  editOrAddLogistic() {
    if (this.isNew) {
      this.isNew = false;
      this.logisticItemXClass.Class.ID = this.classAPI.idClass;
      this.logisticProvider.addLogistic(this.logisticItemXClass)
        .then(() => {
          this.toastProvider.presentTranslatedToast("SuccessLogistic");
        })
        .catch(err => {
          this.toastProvider.presentTranslatedToast("ErrorMessage");
          console.log(err);
        });
    } else {
      this.logisticProvider.updateLogistic(this.logisticItemXClass)
        .then(() => {
          this.toastProvider.presentTranslatedToast("SuccessLogistic");
        })
        .catch(err => {
          this.toastProvider.presentTranslatedToast("ErrorMessage");
          console.log(err);
        });
    }
  }

  ionViewDidLoad() {
    
    this.getTranslatedOpenButton();
    this.loadLogisticTypes();
    let selectedLogistic = this.navParam.get("logistic");

    this.classAPI = this.navParam.get("classAPI");

    this.currentCulture = this.userStore.user.Language.Culture;
    
    if (selectedLogistic) {
      this.logisticItemXClass = Object.assign(new LogisticItemXClass(), selectedLogistic);
      this.loadLogisticItems(this.logisticItemXClass.Type.ID);
      this.isNew = false;
    } else {
      this.logisticItemXClass.Type = new LogisticType();
      this.logisticItemXClass.Item = new LogisticItem();
      this.logistic.Class = new Class();
      this.isNew = true;
    }
  }

  onCloseModal() {
    this.navCtrl.pop();
  }
}
