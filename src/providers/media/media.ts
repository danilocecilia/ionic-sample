import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class MediaProvider {
  constructor(public http: HttpClient, private auth: AuthProvider) {}
    
  loadMedias() {
    return this.http.get(`${APPConfig.cfg.apiUrl}${APPConfig.cfg.media.all}?token=${this.auth.loggedUser.Token}`).toPromise();
  }
}
