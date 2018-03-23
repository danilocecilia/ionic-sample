import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LibraryProvider } from "../../providers/library/library";
import { Loading } from "ionic-angular/components/loading/loading";
import { Observable } from "rxjs";
import { LoadingProvider } from "../../providers/loading/loading";
// import * as moment from "moment";
import localePt from "@angular/common/locales/pt";
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: "library",
  templateUrl: "library.html"
})
export class LibraryComponent implements OnInit {
  loggedUser: any;
  libs: any = {};
  libsArray: any = {};

  constructor(
    public events: Events,
    public libProvider: LibraryProvider,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,

  ) {}
  
  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;
    this.loadLocaleData(this.loggedUser.Language.Culture);
    
    this.loadLibrary();
  }

  loadLocaleData(culture) {
    if (culture) {
      switch (culture) {
        case "pt-BR":
          registerLocaleData(localePt);
          break;
        case "es-ES":
          registerLocaleData(localeEs);
          break;
      }
    }
  }

  loadLibrary() {
    // this.loadingProvider.presentLoadingDefault();
    
    this.libProvider.loadLibrary().then(res => {
      // this.loadingProvider.loading.dismiss();
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

  shouldLibCancel() {}

  onCancel(event) {
    this.loadLibrary();
  }
}
