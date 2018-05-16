import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";
@Injectable()
export class DashboardProvider {
  constructor(private http: HttpClient, private authProvider: AuthProvider) {}

  loadDashboard() {
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.dashboard.load}?token=${this.authProvider.loggedUser.Token}`).toPromise();
  }
}
