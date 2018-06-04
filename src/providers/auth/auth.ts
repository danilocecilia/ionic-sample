import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { App } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import * as AppConfig from "../../app/config";
import { CredentialsModel, ChangePasswordModel } from "../../model/credentials";
import { UserStore } from "../../stores/user.store";
import { User } from "../../model/user";

@Injectable()
export class AuthProvider {
  constructor(
    private http: HttpClient,
    private app: App,
    private userStore: UserStore
  ) {}

  authenticateUser(credentials: CredentialsModel) {
    return this.http
      .post(`${AppConfig.cfg.apiUrl + AppConfig.cfg.user.login}`, credentials)
      .toPromise()
      .then((user: User) => {
        this.userStore.setUser(user);
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  updateDeviceToken(user:User) {
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user_profile.updateDeviceToken}`, user).toPromise();
  }

  public startupRefreshUserInfo() {
    setInterval(() => {
      this.maybeRefreshUserInfo();
    }, AppConfig.ONE_MINUTE);
  }

  private maybeRefreshUserInfo() {
    if (this.userStore.user) {
      this.http
        .get(
          AppConfig.cfg.apiUrl +
            AppConfig.cfg.user.refresh +
            "?token=" +
            this.userStore.user.Token
        )
        .subscribe(
          (userData: User) => {
            if (userData) {
              this.userStore.setUser(userData);
              console.log("User Data Refreshed");
            } else {
              console.log("The Token Black Listed");
              this.logout();
            }
          },
          err => {
            // this will be reached for example when there is no network
            console.error("maybeRefreshUserInfo ERROR", err);
          }
        );
    }
  }

  logout(message?) {
    this.userStore.logout();
    var nav = this.app.getRootNav();
    nav.push("AuthPage", { message });
  }

  changePassword(changePassword: ChangePasswordModel) {
    changePassword.token = this.userStore.user.Token;

    return this.http
      .post(
        `${AppConfig.cfg.apiUrl}${AppConfig.cfg.user.changePassword}?token=${
          this.userStore.user.Token
        }`,
        changePassword
      )
      .toPromise();
  }

  recoverPassword(email: string) {
    return this.http
      .get(
        `${AppConfig.cfg.apiUrl}${
          AppConfig.cfg.user.recoveryPassowrd
        }?login=${email}`
      )
      .toPromise();
  }
}
