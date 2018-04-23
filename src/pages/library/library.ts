import { Component } from "@angular/core";
import { Events, Platform } from "ionic-angular";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LibraryProvider } from "../../providers/library/library";
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { ToastProvider } from "../../providers/toast/toast";
import * as AppConfig from "../../app/config";
import { TranslateProvider } from "../../providers/translate/translate";
import { FileOpener } from "@ionic-native/file-opener";

@Component({
  selector: "library",
  templateUrl: "library.html"
})
export class LibraryPage implements OnInit {
  loggedUser: any;
  libs: any = {};
  libsArray: any = {};
  currentCulture: string;
  filePath: string;
  objCheckFile: any = {};

  constructor(
    private events: Events,
    private libProvider: LibraryProvider,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private toastProvider: ToastProvider,
    private translateProvider: TranslateProvider,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;
    this.currentCulture = this.loggedUser.Language.Culture;
    this.loadLibrary();
  }

  loadLibrary() {
    this.loadingProvider.presentLoadingDefault();

    this.libProvider.loadLibrary().then(res => {
      this.loadingProvider.dismissLoading();
      this.libs = res;
      this.libsArray = res;
    });
  }

  initializeItems(): void {
    this.libsArray = this.libs;
  }

  getItems(event) {
    this.initializeItems();

    // set q to the value of the searchbar
    var val = event.target.value;
    if (val === "" || val === undefined) return this.loadLibrary();

    // if (this.libs.Libraries.length > 0) {
    this.libsArray = this.libsArray.Libraries.filter(v => {
      if (v.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });

    if (this.libs.Libraries.length > 0) this.libs.Libraries = this.libsArray;
    else this.loadLibrary();
  }

  downloadOrOpenFile(filePath: string, fileName: string, extension: string) {
    this.loadingProvider.presentLoadingDefault();

    this.prepareObjectForCheckFile(fileName, extension);

    this.file
      .checkFile(this.objCheckFile.path, this.objCheckFile.fileName)
      .then(found => {
        if (found) {
          this.openDocument(
            this.fileOpener,
            this.objCheckFile,
            AppConfig.fileMimeTypes
          );
        }
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();

        this.downloadFile(filePath, fileName);
        console.log(err);
      });
  }

  downloadFile(filePath: string, fileName: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    const fullSourcePath = `${AppConfig.cfg.baseUrl}${filePath}/${fileName}`; //"http://198.180.251.216:10002/Temp/Library/Bobber_DSG_EN.pdf";

    fileTransfer
      .download(fullSourcePath, this.getDocumentPathFromDevice(fileName))
      .then(
        entry => {
          this.loadingProvider.dismissLoading();

          this.showToastMessage("LibrarySuccess", fileName);

          console.log("download complete: " + entry.toURL());
        },
        error => {
          this.loadingProvider.dismissLoading();

          this.translateProvider.translateMessage("ErrorMessage")
          .then(translated => {
            this.toastProvider.presentToast(translated);
          });

          console.log(error);
        }
      );
  }

  showToastMessage(message: string, param: string) {
    this.translateProvider
      .translateMessageWithParam(message, param)
      .then(translated => {
        this.toastProvider.presentToastWithCallBack(
          translated,
          this.openDocument,
          this.fileOpener,
          this.objCheckFile,
          AppConfig.fileMimeTypes
        );
      });
  }

  openDocument(fileOpener: FileOpener, objCheckFile: any, fileMimeTypes: any) {
    let mimeType = fileMimeTypes.find(
      type => type.name.toLowerCase() === objCheckFile.extension
    );

    fileOpener.open(objCheckFile.fullPath, mimeType.type);
  }

  getDocumentPathFromDevice(fileName: string) {
    if (this.platform.is("ios")) {
      return `${this.file.documentsDirectory}/${fileName}`;
    } else {
      return `${this.file.externalRootDirectory}Download/${fileName}`;
    }
  }

  prepareObjectForCheckFile(fileName: string, extension: string) {
    if (this.platform.is("ios")) {
      this.objCheckFile.path = this.file.documentsDirectory;
      this.objCheckFile.fileName = fileName;
    } else {
      this.objCheckFile.path = this.file.externalRootDirectory;
      this.objCheckFile.fileName = `Download/${fileName}`;
    }

    this.objCheckFile.extension = extension.replace(".", "");
    this.objCheckFile.fullPath =
      this.objCheckFile.path + this.objCheckFile.fileName;
  }

  onCancel(event) {
    this.loadLibrary();
  }
}
