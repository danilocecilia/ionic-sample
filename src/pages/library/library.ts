import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LibraryProvider } from "../../providers/library/library";
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { DownloadProvider } from "../../providers/download/download";
import { UserStore } from "../../stores/user.store";

@Component({
  selector: "library",
  templateUrl: "library.html"
})
export class LibraryPage implements OnInit {
  loggedUser: any;
  libs: any = {};
  libsArray: any = {};
  currentCulture: string;
  open: string;

  constructor(
    private libProvider: LibraryProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private translateProvider: TranslateProvider,
    private downloadProvider: DownloadProvider,
    private userStore: UserStore
  ) { }

  ngOnInit() {
    this.loggedUser = this.userStore.user;
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

  openFile(sourceFilePath: string, sourceFileName: string, extension: string) {
    this.loadingProvider.presentLoadingDefault();

    this.downloadProvider.initializeFileObject(
      sourceFilePath,
      sourceFileName,
      extension
    );

    let checkIfFileIsOnDevice = true;

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
      });
  }

  // showSuccessToast(sourceFileName) {
  //   this.translateProvider
  //     .translateMessageWithParam("LibrarySuccess", sourceFileName)
  //     .then(translated => {
  //       this.toastProvider
  //         .presentToastWithCallBack(translated, this.open)
  //         .then(() => {
  //           this.downloadProvider.openDocument();
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     });
  // }

  showSuccessToast(sourceFileName) {
    const callback = (success) => {
      if (success)
        this.downloadProvider.openDocument();
    }

    this.translateProvider
      .translateMessageWithParam("SuccessDownloaded", sourceFileName)
      .then(translated => {
        this.toastProvider.presentToastWithDismissCallback(translated, this.open, (success) => {
          if (success)
            this.downloadProvider.openDocument();
        })
      });
  }

  getTranslatedOpenButton() {
    this.translateProvider.translateMessage("Open").then(translated => {
      this.open = translated;
    });
  }

  onCancel(event) {
    this.loadLibrary();
  }
}
