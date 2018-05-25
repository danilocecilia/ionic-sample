import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";
import { UserStore } from "../../stores/user.store";

@Injectable()
export class MediaProvider {
  constructor(public http: HttpClient, private userStore: UserStore) {}
    
  loadMedias() {
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.media.all}?token=${this.userStore.user.Token}`).toPromise();
  }
}
