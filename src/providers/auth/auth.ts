import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { JwtHelper } from "angular2-jwt";
import { CredentialsModel, ChangePasswordModel } from "../../model/credentials";
import "rxjs/add/operator/map";
import * as AppConfig from "../../app/config";
import { Observable } from "rxjs/Rx";
import { App } from "ionic-angular";

@Injectable()
export class AuthProvider {
  jwtHelper: JwtHelper = new JwtHelper();
  private cfg: any;
  public loggedUser: any;
  token: string;
  refreshSubscription: any;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private app: App
  ) {
    this.cfg = AppConfig.cfg;
  }

  getAuthenticate(credentials: CredentialsModel) {
    return this.http
      .post(`${this.cfg.apiUrl + this.cfg.user.login}`, credentials)
      .toPromise()
      .then(data => {
        this.saveToLocalStorage(data);
        this.loggedUser = data;
        this.scheduleRefresh();
        return data;
      })
      .catch(err => {
        throw err;
      });
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = Observable.of(this.loggedUser.Token).flatMap(token => {
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      //let jwtIssuedAt = this.jwtHelper.decodeToken(token).iat;
      // let jwtExpirationTime = this.jwtHelper.decodeToken(token).exp;
      // let issuedAt = new Date(0);
      // let expiration = new Date(0);

      // let delay = (expiration.setUTCSeconds(jwtExpirationTime) - issuedAt.setUTCSeconds(jwtIssuedAt)) - 15000;

      // console.info("delay: " + delay);
      // console.info("will start refresh after :", delay / 1000 / 60) + "minutes";

      // if (delay - 1000 <= 0) delay = 1;

      return Observable.interval(60000);
    });

    this.refreshSubscription = source.subscribe(() => {
      this.refreshUserInfo();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.loggedUser) {
      if (this.loggedUser.Token) {
        let source = Observable.of(this.loggedUser.Token).flatMap(token => {
          // Get the expiry time to generate a delay in milliseconds
          // let now: number = new Date().valueOf();
          // let jwtExpirarionTime: number = this.jwtHelper.decodeToken(token).exp;
          // let expiration: Date = new Date(0);
          // expiration.setUTCSeconds(jwtExpirarionTime);
          // let delay: number = expiration.valueOf() - now;

          // if (delay <= 0) {
          //   delay = 1;
          // }
          // Use the delay in a timer to
          // run the refresh at the proper time
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
    if (this.loggedUser) {
      this.http
        .get(
          this.cfg.apiUrl +
            this.cfg.user.refresh +
            "?token=" +
            this.loggedUser.Token
        )
        // .map(response => response.json())
        .subscribe(
          userData => {
            if (userData) {
              this.loggedUser = userData;

              this.saveToLocalStorage(this.loggedUser);

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
    this.storage.remove("currentUser");

    var nav = this.app.getRootNav();
    nav.push("AuthPage", { message });
  }

  public unscheduleRefresh() {
    // Unsubscribe from the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  saveToLocalStorage(data: any) {
    this.storage.set("currentUser", data);
  }

  getLoggedUser() {
    return this.storage.get("currentUser").then(user => {
      if (user) {
        return (this.loggedUser = user);
      }
    });
  }

  changePassword(changePassword: ChangePasswordModel) {
    changePassword.token = this.loggedUser.Token;

    return this.http
      .post(
        `${this.cfg.apiUrl}${this.cfg.user.changePassword}?token=${
          this.loggedUser.Token
        }`,
        changePassword
      )
      .toPromise();
  }

  recoverPassword(email: string) {
    return this.http.get(`${this.cfg.apiUrl}${this.cfg.user.recoveryPassowrd}?login=${email}`).toPromise();
  }
}
