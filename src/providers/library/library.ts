import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import "rxjs/add/operator/map";
import * as APPConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";
@Injectable()
export class LibraryProvider {
  constructor(public http: HttpClient, private auth: AuthProvider) {}

  loadLibrary() {
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.library.all}?token=${this.auth.token}`).toPromise();
  }
}
