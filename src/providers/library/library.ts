import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class LibraryProvider {
  constructor(public http: HttpClient, private userStore: UserStore) {}

  loadLibrary() {
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.library.all}?token=${this.userStore.user.Token}`).toPromise();
  }
}
