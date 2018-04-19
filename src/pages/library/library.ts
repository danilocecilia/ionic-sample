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

@Component({
  selector: "library",
  templateUrl: "library.html"
})
export class LibraryPage implements OnInit {
  loggedUser: any;
  libs: any = {};
  libsArray: any = {};
  currentCulture: string;

  constructor(
    public events: Events,
    public libProvider: LibraryProvider,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private toastProvider: ToastProvider,
    private translateProvider: TranslateProvider
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
    // } else this.loadLibrary();
  }

  downloadFile(filePath, fileName) {
    this.loadingProvider.presentLoadingDefault();
    
    const fileTransfer: FileTransferObject = this.transfer.create();

    const fullSourcePath = `${AppConfig.cfg.baseUrl}${filePath}` //"http://198.180.251.216:10002/Temp/Library/Bobber_DSG_EN.pdf";
    debugger;
    fileTransfer
      .download(fullSourcePath, this.getDocumentPath() + `/${fileName}`)
      .then(
        entry => {
          this.loadingProvider.dismissLoading();
          
          this.getToastMessage("LibrarySuccess", fileName);
          
          console.log("download complete: " + entry.toURL());
        },
        error => {
          this.toastProvider.presentToast("Erro ao baixar o arquivo.");
          console.log(error);
          // handle error
        }
      );
  }

  getToastMessage(message:string, param:string){
    this.translateProvider.translateMessageWithParam(message, param)
    .then(tranlated => {
      this.toastProvider.presentToast(tranlated);
    })
  }

  getDocumentPath() {
    if (this.platform.is("ios")) {
      return this.file.documentsDirectory;
    } else {
      return this.file.externalRootDirectory + "Download";
    }
  }

  shouldLibCancel() {}

  onCancel(event) {
    this.loadLibrary();
  }
}
