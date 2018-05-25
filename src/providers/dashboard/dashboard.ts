import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class DashboardProvider {
  constructor(private http: HttpClient, private userStore: UserStore) {}

  loadDashboard() {
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.dashboard.load}?token=${this.userStore.user.Token}`).toPromise();
  }
}
