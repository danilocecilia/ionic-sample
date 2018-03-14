import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { Storage } from "@ionic/storage";

@Injectable()
export class NotificationProvider {
  private cfg: any;
  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.cfg = AppConfig.cfg;
  }

  getToken() {
    return this.storage.get("currentUser").then(user => {
      if (user) {
        this.token = user.Token;
      }
    });
  }

  loadNotifications() {
    //return this.http.get(`${this.cfg.apiUrl + this.cfg.notification.all}?token=aushdfiuhasiudhfiuahsdiufh`);

    return this.getToken().then(() => {
      return this.http
        .get(
          `${this.cfg.apiUrl + this.cfg.notification.all}?token=${this.token}`
        )
        .toPromise();
    });
  }
}
