import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { App } from "ionic-angular";
import { JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import * as AppConfig from "../../app/config";
import { CredentialsModel, ChangePasswordModel } from "../../model/credentials";
import { UserStore } from "../../stores/user.store";
import { User } from "../../model/user";

@Injectable()
export class AuthProvider {
  jwtHelper: JwtHelper = new JwtHelper();
  refreshSubscription: any;

  constructor(
    private http: HttpClient,
    private app: App,
    private userStore: UserStore
  ) {}

  authenticateUser(credentials: CredentialsModel) {
    return this.http.post(`${AppConfig.cfg.apiUrl + AppConfig.cfg.user.login}`, credentials).toPromise()
      .then((user: User) => {
        this.userStore.authenticateUser(user);

        this.scheduleRefresh();
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  public scheduleRefresh() {
    let source = Observable.of(this.userStore.user.Token)
      .flatMap(token => {
        return Observable.interval(60000);
      });

    this.refreshSubscription = source.subscribe(() => {
      this.refreshUserInfo();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.userStore.user) {
      if (this.userStore.user.Token) {
        let source = Observable.of(this.userStore.user.Token).flatMap(token => {
          return Observable.timer(60000);
        });

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        source.subscribe(() => {
          this.refreshUserInfo();
          this.scheduleRefresh();
        });
      } else {
        console.info("there is no token");
      }
    } else {
      console.info("there is no user logedin");
    }
  }

  public refreshUserInfo() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    if (this.userStore.user) {
        this.http.get(AppConfig.cfg.apiUrl + AppConfig.cfg.user.refresh + "?token=" + this.userStore.user.Token)
        .subscribe((userData:User) => {
            if (userData) {
              this.userStore.authenticateUser(userData);
              console.log("User Data Refreshed");
            } else {
              console.log("The Token Black Listed");
              this.logout();
            }
          },
          err => {
            console.error("refreshUserInfo ERROR", err);
            this.logout();
          }
        );
    }
  }



  logout(message?) {
    // stop function of auto refesh
    this.unscheduleRefresh();
    this.userStore.logout();
    
    var nav = this.app.getRootNav();
    nav.push("AuthPage", { message });
  }

  public unscheduleRefresh() {
    // Unsubscribe from the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  changePassword(changePassword: ChangePasswordModel) {
    changePassword.token = this.userStore.user.Token;

    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user.changePassword}?token=${this.userStore.user.Token}`,changePassword).toPromise();
  }

  recoverPassword(email: string) {
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user.recoveryPassowrd}?login=${email}`).toPromise();
  }
}
