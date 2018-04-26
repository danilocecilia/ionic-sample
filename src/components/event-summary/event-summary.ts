import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { EsEnrollmentsComponent } from "../es-enrollments/es-enrollments";
import { EsGradesComponent } from "../es-grades/es-grades";
import { EsBillingsComponent } from "../es-billings/es-billings";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { EsLogisticsComponent } from "../es-logistics/es-logistics";
import { File } from "@ionic-native/file";
import { EventSummaryProvider } from "../../providers/event-summary/event-summary";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import * as AppConfig from "../../app/config";
import { LoadingProvider } from "../../providers/loading/loading";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { FileOpener } from "@ionic-native/file-opener";

@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent {
  event: any;
  eventSummary: any;
  open : string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private eventSummaryProvider : EventSummaryProvider,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private fileOpener: FileOpener) {
      this.event = this.navParams.get("event");
      
      this.loadEventSummary();
      this.getTranslatedOpenButton();
  }

  loadEventSummary(){
    this.loadingProvider.presentLoadingDefault();

    this.eventSummaryProvider.getEventSummary(7)
    .then((response) => {
      this.loadingProvider.dismissLoading();
      this.eventSummary = response;
      console.log(this.eventSummary);
    });
  }

  download(fileName, extension){
    debugger;
    const path = "/Temp/";
    const fileTransfer: FileTransferObject = this.transfer.create();
    const fullSourcePath = `${AppConfig.cfg.baseUrl}${path}${fileName}`;

    let fileObject = this.getFileObject(path, fileName, extension);

    fileTransfer
      .download(fullSourcePath, this.getDevicePath(fileName))
      .then(
        entry => {
          this.loadingProvider.dismissLoading();

          this.showToastMessage("LibrarySuccess", fileObject);

          console.log("download complete: " + entry.toURL());
        },
        error => {
          this.loadingProvider.dismissLoading();

          this.translateProvider
            .translateMessage("ErrorMessage")
            .then(translated => {
              this.toastProvider.presentToast(translated);
            });

          console.log(error);
        }
      );
  }

  getFileObject(filePath: string, fileName: string, extension: string) {
    let fileObject:any = {};

    if (this.platform.is("ios")) {
      fileObject.targetPath = this.file.documentsDirectory;
      fileObject.targeFileName = fileName;
    } else {
      fileObject.targetPath = this.file.externalRootDirectory;
      fileObject.targeFileName = `Download/${fileName}`;
    }

    fileObject.sourceFileName = fileName;
    fileObject.sourceFilePath = filePath;
    fileObject.extension = extension.replace(".", "");
    fileObject.targetFullPath = fileObject.targetPath + fileObject.targeFileName;
    
    return fileObject;
  }

  showToastMessage(message: string, fileObject) {
    this.translateProvider
      .translateMessageWithParam(message, fileObject.sourceFileName)
      .then(translated => {
        this.toastProvider
          .presentToastWithCallBack(translated, this.open)
          .then(() => {
            this.openDocument(this.fileOpener, fileObject, AppConfig.fileMimeTypes)
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  openDocument(fileOpener: FileOpener, objCheckFile: any, fileMimeTypes: any) {
    let mimeType = fileMimeTypes.find(
      type => type.name.toLowerCase() === objCheckFile.extension
    );

    fileOpener.open(objCheckFile.targetFullPath, mimeType.type);
  }

  getDevicePath(fileName: string) {
    if (this.platform.is("ios")) {
      return `${this.file.documentsDirectory}/${fileName}`;
    } else {
      return `${this.file.externalRootDirectory}Download/${fileName}`;
    }
  }

  getTranslatedOpenButton(){
    this.translateProvider.translateMessage("Open")
    .then((translated) => {
      this.open = translated;
    })
  }

  onClickGrades() {
    this.navCtrl.push(EsGradesComponent, { event: this.event });
  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, { event: this.event });
  }

  onClickLogistics() {
    this.navCtrl.push(EsLogisticsComponent, { event: this.event });
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, { event: this.event });
  }
}
