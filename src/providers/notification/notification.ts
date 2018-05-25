import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../../providers/auth/auth";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class NotificationProvider {
  constructor(private http: HttpClient, private userStore: UserStore) {}

  loadNotifications() {
    return this.http.get(`${AppConfig.cfg.apiUrl + AppConfig.cfg.notification.all}?token=${this.userStore.user.Token}`).toPromise();
  }

  setNotificationRead(id){
    let notificationReadParams = {
      ID: id,
      Token: this.userStore.user.Token
    } 
    return this.http.post(`${AppConfig.cfg.apiUrl + AppConfig.cfg.notification.notifyRead}`, notificationReadParams).toPromise();
  }
}
