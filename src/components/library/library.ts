import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LibraryProvider } from "../../providers/library/library";
import { Loading } from "ionic-angular/components/loading/loading";
import { Observable } from "rxjs";
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the LibraryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "library",
  templateUrl: "library.html"
})

export class LibraryComponent implements OnInit {

  constructor(public events: Events, public libProvider: LibraryProvider, private loadingProvider : LoadingProvider) { }

  libs: any = {};
  libsArray: any = {};
  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadLibrary();
  }

  loadLibrary() {
    this.libProvider.loadLibrary().subscribe(res => {
      this.loadingProvider.loading.dismiss();
      this.libs = res[0];
      this.libsArray = res[0];
    });
  }

  initializeItems(): void {
    this.libsArray = this.libs;
  }

  getItems(event) {
    this.initializeItems();

    // set q to the value of the searchbar
    var val = event.target.value;
    if (val === '' || val === undefined)
      return this.loadLibrary();

    // if (this.libs.Libraries.length > 0) {
    this.libsArray = this.libsArray.Libraries.filter(v => {
      if (v.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });

    if (this.libs.Libraries.length > 0)
      this.libs.Libraries = this.libsArray;
    else
      this.loadLibrary();
    // } else this.loadLibrary();
  }

  shouldLibCancel() {

  }

  onCancel(event) {
    this.loadLibrary();
  }
}
