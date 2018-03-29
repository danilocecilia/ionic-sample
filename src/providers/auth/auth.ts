import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { AuthHttp, JwtHelper, tokenNotExpired } from "angular2-jwt";
import { CredentialsModel } from "../../models/credentials";
import "rxjs/add/operator/map";
import * as AppConfig from "../../app/config";
import { Observable } from "rxjs/Rx";
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
    this.cfg = AppConfig.cfg;
  }

  getAuthenticate(credentials: CredentialsModel) {
    return this.authHttp
      .post(`${this.cfg.apiUrl + this.cfg.user.login}`, credentials)
      .toPromise()
      .then(data => {
        data = data.json();
        this.saveToLocalStorage(data);
        this.loggedUser = data;
        this.scheduleRefresh();
      });
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = Observable.of(this.loggedUser.Token).flatMap(token => {
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIssuedAt = this.jwtHelper.decodeToken(token).iat;
      let jwtExpirationTime = this.jwtHelper.decodeToken(token).exp;
      let issuedAt = new Date(0);
      let expiration = new Date(0);

      let delay = expiration.setUTCSeconds(jwtExpirationTime) - issuedAt.setUTCSeconds(jwtIssuedAt);

      console.info("delay: " + delay);
      console.info("will start refresh after :", delay / 1000 / 60) + "minutes";

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
    if (this.loggedUser) {
      if (this.loggedUser.Token) {
        let source = Observable.of(this.loggedUser.Token).flatMap(token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExpirarionTime: number = this.jwtHelper.decodeToken(token).exp;
          let expiration: Date = new Date(0);
          expiration.setUTCSeconds(jwtExpirarionTime);
          let delay: number = expiration.valueOf() - now;

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
        console.info("there is no token");
      }
    } else {
      console.info("there is no user logedin");
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    if(this.loggedUser){
      this.http
        .get(this.cfg.apiUrl + this.cfg.user.refresh + "?token=" + this.loggedUser.Token)
        .map(res => res.json())
        .subscribe(
          res => {
            if (res.refreshToken) {
                this.loggedUser.Token = res.refreshToken;
                this.saveToLocalStorage(this.loggedUser);
                console.log(this.loggedUser)
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
}
