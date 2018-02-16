import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LibraryProvider } from "../../providers/library/library";
import { Loading } from "ionic-angular/components/loading/loading";
import { Observable } from "rxjs";

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
  // libs: Observable<any>;
  // libsArray: Observable<any>;
  libs:any;
  libsArray:any;
  constructor(public events: Events, public libProvider: LibraryProvider) {}

  ngOnInit() {
    this.loadLibrary();
  }

  loadLibrary() {
    return (this.libs = this.libProvider.loadLibrary().subscribe(res => {
      this.libs = res[0];
      this.libsArray = res[0];
    }));
  }

  // loadLibrary() {
  //   debugger;
  //   this.libProvider.loadLibrary().subscribe((res:any) => {
  //       debugger;
  //       this.libs = res[0];
  //       this.libsArray = res[0];
  //       console.log(this.libs);
  //   });
  // }


  initializeItems(): void {
    this.libsArray = this.libs;
  }

  getItems(event) {
    this.initializeItems();

    // set q to the value of the searchbar
    var val = event.target.value;
    debugger;
    if(val === '' || val === undefined)
      return this.loadLibrary();

    // if (this.libs.Libraries.length > 0) {
      this.libsArray = this.libsArray.Libraries.filter(v => {
        if (v.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });

      if(this.libs.Libraries.length > 0)
        this.libs.Libraries = this.libsArray;
      else
        this.loadLibrary();
    // } else this.loadLibrary();
  }

  shouldLibCancel() {
    debugger;
  }

  onCancel(event) {
    this.loadLibrary();
  }
}
