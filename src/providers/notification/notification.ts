import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";

@Injectable()
export class NotificationProvider {
  private cfg: any;
  notification: any;

  constructor(public http: HttpClient, private authProvider: AuthProvider) {
    this.cfg = AppConfig.cfg;
  }

  loadNotifications() {
    return this.http
      .get(`${this.cfg.apiUrl + this.cfg.notification.all}?token=${this.authProvider.loggedUser.Token}`)
      .toPromise();
      // .then(result => {
      //   debugger;
      //   this.notification = result;
      // });
  }

  setNotificationRead(id){
    let notificationReadParams = {
      ID: id,
      Token: this.authProvider.loggedUser.Token
    } 
    return this.http.post(`${this.cfg.apiUrl + this.cfg.notification.notifyRead}`, notificationReadParams).toPromise();
  }
}
