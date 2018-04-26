import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
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
  open : string;

  constructor(
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
    this.getTranslatedOpenButton();
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

  downloadOrOpenFile(sourceFilePath: string, sourceFileName: string, extension: string) {
    this.loadingProvider.presentLoadingDefault();

    let fileObject = this.getFileObject(sourceFilePath, sourceFileName, extension);

    this.file
      .checkFile(fileObject.targetPath, fileObject.targetFileName)
      .then(() => {
        //promise will always resolve when it found the file
        this.openDocument(this.fileOpener, fileObject, AppConfig.fileMimeTypes);
      })
      .catch(err => {
        this.downloadFile(fileObject);
        console.log(err);
      });
  }

  downloadFile(fileObject: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    const fullSourcePath = `${AppConfig.cfg.baseUrl}${fileObject.sourceFilePath}/${fileObject.sourceFileName}`; //"http://198.180.251.216:10002/Temp/Library/Bobber_DSG_EN.pdf";

    fileTransfer
      .download(fullSourcePath, this.getDocumentPathFromDevice(fileObject.sourceFileName))
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

  getDocumentPathFromDevice(fileName: string) {
    if (this.platform.is("ios")) {
      return `${this.file.documentsDirectory}/${fileName}`;
    } else {
      return `${this.file.externalRootDirectory}Download/${fileName}`;
    }
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

  getTranslatedOpenButton(){
    this.translateProvider.translateMessage("Open")
    .then((translated) => {
      this.open = translated;
    })
  }
  
  onCancel(event) {
    this.loadLibrary();
  }
}
