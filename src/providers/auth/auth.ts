import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { AuthHttp, JwtHelper, tokenNotExpired } from "angular2-jwt";
import { CredentialsModel } from "../../models/credentials";
import "rxjs/add/operator/map";
import * as AppConfig from "../../app/config";
import { Observable } from "rxjs/Rx";
import { HttpParams } from "@angular/common/http";
import { ToastController, App } from "ionic-angular";

@Injectable()
export class AuthProvider {
  jwtHelper: JwtHelper = new JwtHelper();
  private cfg: any;
  public loggedUser: any;
  token: string;
  refreshSubscription: any;

  constructor(
    public http: Http,
    private authHttp: AuthHttp,
    private storage: Storage,
    private toastCtrl: ToastController,
    private app: App
  ) {
    this.getToken();

    this.cfg = AppConfig.cfg;
  }

  getAuthenticate(credentials: CredentialsModel) {
    return this.authHttp
      .post(`${this.cfg.apiUrl + this.cfg.user.login}`, credentials)
      .toPromise()
      .then(data => {
        let rs = data.json();
        this.saveData(data);
        this.token = rs.Token;
        this.scheduleRefresh();
      });
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = Observable.of(this.token).flatMap(token => {
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time

      let jwtIat = this.jwtHelper.decodeToken(token).iat; // issuedAt
      let jwtExp = this.jwtHelper.decodeToken(token).exp; // expirationTime
      let iat = new Date(0);
      let exp = new Date(0);
      console.info("jwtIat: " + jwtIat);
      console.info("jwtExp: " + jwtExp);

      let delay = exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat);

      console.info("delay: " + delay);
      console.log("will start refresh after :", delay / 1000 / 60) + "minutes";

      if (delay - 1000 <= 0) delay = 1;
      return Observable.interval(delay);
    });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    this.storage.get("currentUser").then(user => {
      if (user) {
        if (user.Token) {
          let source = Observable.of(user.Token).flatMap(token => {
            // Get the expiry time to generate
            // a delay in milliseconds
            let now: number = new Date().valueOf();
            let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
            let exp: Date = new Date(0);
            exp.setUTCSeconds(jwtExp);
            let delay: number = exp.valueOf() - now;

            if (delay <= 0) {
              delay = 1;
            }
            // Use the delay in a timer to
            // run the refresh at the proper time
            return Observable.timer(delay);
          });

          // Once the delay time from above is
          // reached, get a new JWT and schedule
          // additional refreshes
          source.subscribe(() => {
            this.getNewJwt();
            this.scheduleRefresh();
          });
        } else {
          //there is no user logined
          console.info("there is no token");
        }
      } else {
        console.info("there is no user logedin");
      }
    });
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.storage.get("currentUser").then(user => {
      let senddata: { Token: string } = {
        Token: user.Token
      };

      this.http
        .get(this.cfg.apiUrl + this.cfg.user.refresh + "?token=" + user.Token)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(JSON.stringify(res));
            let updatedUser;

            if (res.refreshToken) {
              this.storage
                .get("currentUser")
                .then(user => {
                  if (user) {
                    user.Token = res.refreshToken;
                  }
                })
                .then(() => {
                  this.storage.set("currentUser", user);
                });
            } else {
              console.log("The Token Black Listed");
              this.logout();
            }
          },
          err => {
            console.error("ERROR", err);
            this.logout();
          }
        );
    });
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

  saveData(data: any) {
    let rs = data.json();
    this.storage.set("currentUser", rs);
    this.loggedUser = rs;
  }

  getLoggedUser() {
    return this.storage.get("currentUser").then(user => {
      if (user) {
        return this.loggedUser = user;
      }
    });
  }

  getToken() {
    return this.storage.get("currentUser").then(user => {
      if (user) {
        return (this.token = user.Token);
      }
    });
  }
}
